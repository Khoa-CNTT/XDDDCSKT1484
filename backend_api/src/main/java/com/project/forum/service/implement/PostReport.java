package com.project.forum.service.implement;

import com.project.forum.dto.responses.post.PostRepostMessage;
import com.project.forum.dto.responses.post.PostRepostResponse;
import com.project.forum.enity.Posts;
import com.project.forum.enums.ErrorCode;
import com.project.forum.exception.WebException;
import com.project.forum.repository.PostReportsRepository;
import com.project.forum.repository.PostsRepository;
import com.project.forum.service.IPostReport;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class PostReport implements IPostReport {

    PostsRepository postsRepository;

    PostReportsRepository postReportsRepository;


    @Override
    public Page<PostRepostResponse> getAll(Integer page, Integer size, String postId) {
        Pageable pageable = PageRequest.of(page, size);
        Page<PostRepostResponse> postRepostResponses = postReportsRepository.getPostRepost(postId, pageable);
        return postRepostResponses;
    }

    @Override
    public PostRepostMessage delete(String postId) {
        Posts posts = postsRepository.findById(postId).orElseThrow(() -> new WebException(ErrorCode.E_POST_NOT_FOUND));
        postsRepository.delete(posts);
        return PostRepostMessage.builder()
                .message("Deleted Post Successfully")
                .result(true)
                .build();
    }

    @Override
    public PostRepostMessage updateStatus(String postId) {
        Posts posts = postsRepository.findById(postId).orElseThrow(() -> new WebException(ErrorCode.E_POST_NOT_FOUND));
        if (posts.isPostShow()) {
            posts.setPostShow(false);
            postsRepository.save(posts);
            return PostRepostMessage.builder()
                    .message("Hidden Post Successfully")
                    .result(false)
                    .build();
        } else {
            posts.setPostShow(true);
            postsRepository.save(posts);
            return PostRepostMessage.builder()
                    .message("Show Post Successfully")
                    .result(true)
                    .build();
        }
    }
}
