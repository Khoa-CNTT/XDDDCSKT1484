package com.project.forum.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.project.forum.dto.requests.comment.CreateCommentDto;
import com.project.forum.dto.responses.comment.CommentResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface ICommentService {

    CommentResponse create(CreateCommentDto createCommentDto) throws JsonProcessingException;

    Page<CommentResponse> findCommentByPost(Integer size, Integer page, String postId);

    boolean deleteComment(String id);


}
