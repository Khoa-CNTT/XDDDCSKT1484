package com.project.forum.service.implement;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.project.forum.dto.requests.like.CreateLikeDto;
import com.project.forum.dto.responses.like.LikeResponse;
import com.project.forum.enity.Likes;
import com.project.forum.enity.Posts;
import com.project.forum.enity.Users;
import com.project.forum.enums.ErrorCode;
import com.project.forum.enums.TypeNotice;
import com.project.forum.enums.TypePost;
import com.project.forum.exception.WebException;
import com.project.forum.repository.LikesRepository;
import com.project.forum.repository.NoticesRepository;
import com.project.forum.repository.PostsRepository;
import com.project.forum.repository.UsersRepository;
import com.project.forum.service.ILikeService;
import com.project.forum.service.INoticeService;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Service
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class LikeService implements ILikeService {

    LikesRepository likesRepository;
    PostsRepository postsRepository;
    UsersRepository usersRepository;
    NoticesRepository noticesRepository;
    INoticeService noticeService;

    @Transactional
    @Override
    public LikeResponse actionLike(CreateLikeDto createLikeDto) throws JsonProcessingException {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        Users users = usersRepository.findByUsername(username)
                .orElseThrow(() -> new WebException(ErrorCode.E_USER_NOT_FOUND));
        Posts posts = postsRepository.findById(createLikeDto.getPostId())
                .orElseThrow(() -> new WebException(ErrorCode.E_POST_NOT_FOUND));

        if (likesRepository.existsByPosts_IdAndUsers_Id(posts.getId(), users.getId())) {
            likesRepository.deleteByPosts_IdAndUsers_Id(posts.getId(), users.getId());
            return LikeResponse.builder()
                    .liked(false)
                    .message("UnLike Success")
                    .build();
        } else {
            Likes likes = Likes.builder()
                    .users(users)
                    .posts(posts)
                    .created_at(LocalDateTime.now())
                    .build();
            likesRepository.save(likes);

            String postOwnerId = posts.getUsers().getId();

            int likeCount = noticesRepository.countNoticesByTypeAndPost_id(
                    TypeNotice.LIKE.toString(), posts.getId());

            String message = "";
            if (likeCount == 0) {
                if (posts.getType_post().equals(TypePost.CONTENT.toString())) {
                    String title = posts.getPostContent().getTitle();
                    String safeTitle = title.substring(0, Math.min(title.length(), 12));
                    message = users.getName() + " like your post " + safeTitle;
                } else {
                    String question = posts.getPostPoll().getQuestion();
                    String safeTitle = question.substring(0, Math.min(question.length(), 12));

                    message = users.getName() + " like your post " + safeTitle;
                }
            } else {
                if (posts.getType_post().equals(TypePost.CONTENT.toString())) {
                    String title = posts.getPostContent().getTitle();
                    String safeTitle = title.substring(0, Math.min(title.length(), 12));
                    message = users.getName() + " and " + likeCount + " other people like your post " + safeTitle;
                } else {
                    String question = posts.getPostPoll().getQuestion();
                    String safeTitle = question.substring(0, Math.min(question.length(), 12));

                    message = users.getName() + " and " + likeCount + " other people like your post " + safeTitle;
                }
            }

            noticeService.sendNotification(posts.getUsers(), TypeNotice.LIKE.toString(),message, postOwnerId,null );
        }

        return LikeResponse.builder()
                .liked(true)
                .message("Like Success")
                .build();
    }

}

