package com.project.forum.service.implement;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.project.forum.dto.requests.comment.CreateCommentReplyDto;
import com.project.forum.dto.responses.comment.CommentResponse;
import com.project.forum.enity.CommentReply;
import com.project.forum.enity.Comments;
import com.project.forum.enity.Users;
import com.project.forum.enums.ErrorCode;
import com.project.forum.enums.RolesCode;
import com.project.forum.enums.TypeNotice;
import com.project.forum.exception.WebException;
import com.project.forum.repository.CommentReplyRepository;
import com.project.forum.repository.CommentsRepository;
import com.project.forum.repository.PostsRepository;
import com.project.forum.repository.UsersRepository;
import com.project.forum.service.ICommentReplyService;
import com.project.forum.service.INoticeService;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class CommentReplyService implements ICommentReplyService {

    CommentReplyRepository commentReplyRepository;

    CommentsRepository commentsRepository;

    PostsRepository postsRepository;

    UsersRepository usersRepository;

    INoticeService noticeService;

    @Override
    public CommentResponse create(CreateCommentReplyDto createCommentReplyDto) throws JsonProcessingException {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        Users users = usersRepository.findByUsername(username)
                .orElseThrow(() -> new WebException(ErrorCode.E_USER_NOT_FOUND));

        Comments parentComment = commentsRepository.findById(createCommentReplyDto.getCommentId())
                .orElseThrow(() -> new WebException(ErrorCode.E_COMMENT_NOT_FOUND));

        CommentReply commentReply = CommentReply.builder()
                .users(users)
                .comments(parentComment)
                .content(createCommentReplyDto.getContent())
                .created_at(LocalDateTime.now())
                .build();

        commentReply = commentReplyRepository.save(commentReply);


        String message = users.getName() + " replied to your comment: " +
                createCommentReplyDto.getContent().substring(0, Math.min(createCommentReplyDto.getContent().length(), 12)) + " ...";
        noticeService.sendNotification(commentReply.getUsers(), TypeNotice.COMMENT_REPLY.toString(),message, parentComment.getPosts().getId(),null);
        return CommentResponse.builder()
                .id(commentReply.getId())
                .is_user(true)
                .created_at(LocalDateTime.now())
                .user_name(users.getName())
                .user_img(users.getImg())
                .build();
    }

    @Override
    public Page<CommentResponse> findCommentReplyByCommentId(Integer size, Integer page, String commentId) {
        Pageable pageable = PageRequest.of(page, size);
        String username = SecurityContextHolder.getContext().getAuthentication().getName();

        if (username.equals("anonymousUser")) {
            return commentReplyRepository.findCommentReplyByCommentIdAndUserId(commentId, null, pageable);
        }

        Users users = usersRepository.findByUsername(username)
                .orElseThrow(() -> new WebException(ErrorCode.E_USER_NOT_FOUND));

        return commentReplyRepository.findCommentReplyByCommentIdAndUserId(commentId, users.getId(), pageable);
    }

    @Override
    public boolean deleteCommentReply(String id) {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        Users users = usersRepository.findByUsername(username)
                .orElseThrow(() -> new WebException(ErrorCode.E_USER_NOT_FOUND));

        CommentReply commentReply = commentReplyRepository.findById(id)
                .orElseThrow(() -> new WebException(ErrorCode.E_COMMENT_NOT_FOUND));

        if (commentReply.getUsers().getId().equals(users.getId()) ||
                users.getRoles().equals(RolesCode.ADMIN) ||
                users.getRoles().equals(RolesCode.EMPLOYEE)) {
            commentReplyRepository.delete(commentReply);
            return true;
        }

        return false;
    }



}
