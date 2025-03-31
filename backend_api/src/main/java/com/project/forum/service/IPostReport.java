package com.project.forum.service;

import com.project.forum.dto.responses.post.PostRepostMessage;
import com.project.forum.dto.responses.post.PostRepostResponse;
import org.springframework.data.domain.Page;

public interface IPostReport {

    Page<PostRepostResponse> getAll(Integer page, Integer size, String postId);

    PostRepostMessage delete(String postId);

    PostRepostMessage updateStatus(String postId);

}
