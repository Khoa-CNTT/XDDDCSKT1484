package com.project.forum.service;

import com.project.forum.dto.requests.post.CreatePollOptionDto;
import com.project.forum.dto.requests.post.CreatePostPollDto;
import com.project.forum.dto.responses.post.PostPollResponse;
import com.project.forum.dto.responses.post.PostResponse;

public interface IPostPollService {
    PostPollResponse findPostPollByPostId(String postId);

    PostResponse create(CreatePostPollDto createPostPollDto);
}
