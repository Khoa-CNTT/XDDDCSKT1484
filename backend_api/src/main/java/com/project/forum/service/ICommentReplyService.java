package com.project.forum.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.project.forum.dto.requests.comment.CreateCommentReplyDto;
import com.project.forum.dto.responses.comment.CommentResponse;
import org.springframework.data.domain.Page;

public interface ICommentReplyService {

    CommentResponse create(CreateCommentReplyDto createCommentReplyDto) throws JsonProcessingException;


    Page<CommentResponse> findCommentReplyByCommentId(Integer size, Integer page, String commentId);

    boolean deleteCommentReply(String id);


}
