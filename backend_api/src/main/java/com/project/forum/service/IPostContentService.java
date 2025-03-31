package com.project.forum.service;

import com.project.forum.dto.requests.post.CreatePostContentDto;
import com.project.forum.dto.requests.post.UpdatePostContentDto;
import com.project.forum.dto.responses.post.PostContentResponse;
import com.project.forum.dto.responses.post.PostResponse;

import java.io.IOException;

public interface IPostContentService {

    PostContentResponse findPostContentByPostId(String postId);

    PostResponse create(CreatePostContentDto createPostContentDto) throws IOException;

    PostResponse update(String id, UpdatePostContentDto updatePostContentDto) throws IOException;

}
