package com.project.forum.service;


import com.project.forum.dto.responses.post.PostResponse;
import org.springframework.data.domain.Page;

public interface IPostService {

    Page<PostResponse> findAllPost(Integer page, Integer size, String content, String language);

    PostResponse findPostById(String id);

    boolean deletePostById(String id);

    Page<PostResponse> userPost(Integer page, Integer size);

    Page<PostResponse> findPostByIdUser(String IdUser,Integer page, Integer size);

}
