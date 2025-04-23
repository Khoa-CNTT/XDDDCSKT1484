package com.project.forum.service;


import com.project.forum.dto.requests.post.PostShowRequest;
import com.project.forum.dto.responses.post.PostResponse;
import com.project.forum.dto.responses.post.PostTotalResponse;
import org.springframework.data.domain.Page;

import java.time.LocalDateTime;

public interface IPostService {

    Page<PostResponse> findAllPost(Integer page, Integer size, String content, String language);

    PostResponse findPostById(String id);

    boolean deletePostById(String id);

    Page<PostResponse> userPost(Integer page, Integer size);

    Page<PostResponse> findPostByIdUser(String IdUser,Integer page, Integer size);

    Page<PostResponse> findAllPostAdmin(Integer page, Integer size, String content, String language);

    PostTotalResponse postTotal(LocalDateTime start, LocalDateTime end);

    PostResponse showPostById(String id, PostShowRequest postShowRequest);
}
