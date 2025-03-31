package com.project.forum.service.implement;

import com.project.forum.dto.requests.post.CreatePostContentDto;
import com.project.forum.dto.requests.post.UpdatePostContentDto;
import com.project.forum.dto.responses.post.PostContentResponse;
import com.project.forum.dto.responses.post.PostResponse;
import com.project.forum.enity.*;
import com.project.forum.enums.ErrorCode;
import com.project.forum.enums.TypeNotice;
import com.project.forum.enums.TypePost;
import com.project.forum.exception.WebException;
import com.project.forum.mapper.PostMapper;
import com.project.forum.repository.*;
import com.project.forum.service.IAIService;
import com.project.forum.service.INoticeService;
import com.project.forum.service.IPostContentService;
import com.project.forum.service.IPromotionService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.cloudinary.json.JSONObject;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.Date;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class PostContentService implements IPostContentService {

    PostContentRepository postContentRepository;

    PostsRepository postsRepository;

    UsersRepository usersRepository;

    PostReportsRepository postReportsRepository;

    PostMapper postMapper;

    LanguageRepository languageRepository;

    IPromotionService promotionService;

    IAIService iaiService;

    INoticeService noticeService;

    NoticesRepository noticesRepository;

    PostContentHistoryRepository postContentHistoryRepository;

    @Override
    public PostContentResponse findPostContentByPostId(String postId) {
        return postContentRepository.findByPosts_Id(postId).orElseThrow(() -> new WebException(ErrorCode.E_POST_NOT_FOUND));
    }

    @Override
    public PostResponse create(CreatePostContentDto createPostContentDto) throws IOException {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        Users user = usersRepository.findByUsername(username).orElseThrow(() -> new WebException(ErrorCode.E_USER_NOT_FOUND));
        Language language = languageRepository.findByName(createPostContentDto.getLanguage()).orElseThrow(() -> new WebException(ErrorCode.E_LANGUAGE_NOT_FOUND));
        Posts posts = Posts.builder()
                .language(language)
                .type_post(TypePost.CONTENT.toString())
                .users(user)
                .updated_at(LocalDateTime.now())
                .created_at(LocalDateTime.now())
                .build();
        postsRepository.save(posts);
        PostContent postContent = PostContent.builder()
                .content(createPostContentDto.getContent())
                .title(createPostContentDto.getTitle())
                .img_url(createPostContentDto.getImg_url())
                .posts(posts)
                .build();

        String promotion = promotionService.generatePromotionPostContentMessage(posts.getLanguage().getName(),
                postContent.getTitle() + " " + postContent.getContent());
        String aiResponse = iaiService.getAnswer(promotion);
        JSONObject jsonObject = new JSONObject(aiResponse);
        boolean result = jsonObject.getBoolean("result");
        if (!result) {
            String message = jsonObject.getString("message");
            posts.setPostShow(false);
            PostReports postReports = PostReports.builder()
                    .reason(message)
                    .type_reports(TypePost.CONTENT.getPost())
                    .posts(posts)
                    .build();
            postReportsRepository.save(postReports);
            Notices notices = Notices.builder()
                    .users(user)
                    .post_id(posts.getId())
                    .message(message)
                    .type(TypeNotice.POST.toString())
                    .status(false)
                    .build();
            noticesRepository.save(notices);

            noticeService.sendNotification(user, TypeNotice.POST.toString(), message, posts.getId(), null);
        } else {
            posts.setPostShow(true);
        }
        postsRepository.save(posts);
        postContentRepository.save(postContent);
        PostResponse postResponse = postMapper.toPostsResponse(posts);
        postResponse.setUser_post(true);
        return postResponse;
    }

    @Override
    public PostResponse update(String id, UpdatePostContentDto updatePostContentDto) throws IOException {
        PostContent postContent = postContentRepository.findPostContentsByPosts_Id(id).orElseThrow(() -> new WebException(ErrorCode.E_POST_NOT_FOUND));
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        Users users = usersRepository.findByUsername(username).orElseThrow(() -> new WebException(ErrorCode.E_USER_NOT_FOUND));
        String promotion = promotionService.generatePromotionPostContentMessage(postContent.getPosts().getLanguage().getName(),
                postContent.getTitle() + " " + postContent.getContent());
        String aiResponse = iaiService.getAnswer(promotion);
        JSONObject jsonObject = new JSONObject(aiResponse);
        boolean result = jsonObject.getBoolean("result");
        if (!result) {
            String message = jsonObject.getString("message");
            postContent.getPosts().setPostShow(false);
            PostReports postReports = PostReports.builder()
                    .reason(message)
                    .posts(postContent.getPosts())
                    .build();
            postReportsRepository.save(postReports);
            Notices notices = Notices.builder()
                    .users(users)
                    .post_id(postContent.getPosts().getId())
                    .message(message)
                    .type(TypeNotice.POST.toString())
                    .status(false)
                    .build();
            noticesRepository.save(notices);
            noticeService.sendNotification(users, TypeNotice.POST.toString(), message, postContent.getPosts().getId(), null);
        } else {
            postContent.getPosts().setPostShow(true);
        }
        postsRepository.save(postContent.getPosts());
        PostResponse postResponse = postMapper.toPostsResponse(postContent.getPosts());
        postResponse.setUser_post(true);
        return postResponse;

    }

}
