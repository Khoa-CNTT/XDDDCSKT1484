package com.project.forum.service.implement;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.project.forum.dto.requests.comment.CreateCommentDto;
import com.project.forum.dto.responses.comment.CommentResponse;
import com.project.forum.enity.Comments;
import com.project.forum.enity.Posts;
import com.project.forum.enity.Users;
import com.project.forum.enums.ErrorCode;
import com.project.forum.enums.RolesCode;
import com.project.forum.enums.TypeNotice;
import com.project.forum.enums.TypePost;
import com.project.forum.exception.WebException;
import com.project.forum.mapper.CommentMapper;
import com.project.forum.repository.CommentsRepository;
import com.project.forum.repository.NoticesRepository;
import com.project.forum.repository.PostsRepository;
import com.project.forum.repository.UsersRepository;
import com.project.forum.service.ICommentService;
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
public class CommentService implements ICommentService {

    CommentsRepository commentsRepository;

    PostsRepository postsRepository;

    UsersRepository usersRepository;

    INoticeService noticeService;

    NoticesRepository noticesRepository;

    CommentMapper commentMapper;

    @Override
    public CommentResponse create(CreateCommentDto createCommentDto) throws JsonProcessingException {

        String message = "";
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        Users users = usersRepository.findByUsername(username).orElseThrow(() -> new WebException(ErrorCode.E_USER_NOT_FOUND));
        Posts posts = postsRepository.findById(createCommentDto.getPostId()).orElseThrow(() -> new WebException(ErrorCode.E_POST_NOT_FOUND));

        int count = noticesRepository.countNoticesByTypeAndPost_id(TypeNotice.COMMENT.toString(), posts.getId());
        if (count == 0) {
            if (posts.getType_post().equals(TypePost.CONTENT.toString())) {
                String title = posts.getPostContent().getTitle();
                String safeTitle = title.substring(0, Math.min(title.length(), 12));
                message = users.getName() + " comment your post " + safeTitle;
            } else {
                String question = posts.getPostPoll().getQuestion();
                String safeTitle = question.substring(0, Math.min(question.length(), 12));
                message = users.getName() + " comment your post " + safeTitle;
            }
        } else if (posts.getType_post().equals(TypePost.CONTENT.toString())) {
            String title = posts.getPostContent().getTitle();
            String safeTitle = title.substring(0, Math.min(title.length(), 12));
            message += users.getName() + " and " + count + " other people comment your post " + safeTitle + " ...";
        } else {
            String question = posts.getPostPoll().getQuestion();
            String safeQuestion = question.substring(0, Math.min(question.length(), 12));
            message += users.getName() + " and " + count + " other people comment your post " + safeQuestion + " ...";
        }


        Comments comments = Comments.builder()
                .users(users)
                .posts(posts)
                .content(createCommentDto.getContent())
                .created_at(LocalDateTime.now())
                .build();

        noticeService.sendNotification(posts.getUsers(), TypeNotice.COMMENT.toString(), message, posts.getId(),null);

        commentsRepository.save(comments);
        CommentResponse commentResponse = commentMapper.toCommentResponse(comments);
        commentResponse.set_user(true);
        commentResponse.setCreated_at(LocalDateTime.now());
        return commentResponse;
    }

    @Override
    public Page<CommentResponse> findCommentByPost(Integer size, Integer page, String postId) {
        Pageable pageable = PageRequest.of(page, size);
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        if (username.equals("anonymousUser")) {
            return commentsRepository.findCommentByPostIdAndUserId(postId, null, pageable);
        }
        Users users = usersRepository.findByUsername(username)
                .orElseThrow(() -> new WebException(ErrorCode.E_USER_NOT_FOUND));
        Page<CommentResponse> commentResponses = commentsRepository.findCommentByPostIdAndUserId(postId, users.getId(), pageable);

        return commentResponses;
    }

    @Override
    public boolean deleteComment(String id) {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        Users users = usersRepository.findByUsername(username).orElseThrow(() -> new WebException(ErrorCode.E_USER_NOT_FOUND));
        Comments comments = commentsRepository.findById(id).orElseThrow(() -> new WebException(ErrorCode.E_COMMENT_NOT_FOUND));
        if (comments.getUsers().getId().equals(users.getId()) || users.getRoles().equals(RolesCode.ADMIN) || users.getRoles().equals(RolesCode.EMPLOYEE)) {
            commentsRepository.delete(comments);
            return true;
        } else
            return false;

    }
}
