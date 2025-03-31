package com.project.forum.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.project.forum.dto.requests.comment.CreateCommentDto;
import com.project.forum.dto.requests.comment.CreateCommentReplyDto;
import com.project.forum.dto.responses.comment.CommentResponse;
import com.project.forum.exception.ApiResponse;
import com.project.forum.service.ICommentReplyService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@AllArgsConstructor
@RequestMapping("/comment-reply")
@Tag(name = "10. Comment Reply")
public class CommentReplyController {
    ICommentReplyService commentReplyService;

    @SecurityRequirement(name = "BearerAuth")
    @PostMapping()
    ResponseEntity<ApiResponse<CommentResponse>> create(@RequestBody() CreateCommentReplyDto createCommentReplyDto) throws JsonProcessingException {
        return ResponseEntity.status(HttpStatus.CREATED).body(ApiResponse.<CommentResponse>builder()
                .data(commentReplyService.create(createCommentReplyDto))
                .build());
    }

    @SecurityRequirement(name = "BearerAuth")
    @GetMapping
    ResponseEntity<ApiResponse<Page<CommentResponse>>> getAll(@RequestParam(defaultValue = "0") Integer page,
                                                              @RequestParam(defaultValue = "10") Integer size,
                                                              @RequestParam(defaultValue = "") String commentId) {
        return ResponseEntity.ok(ApiResponse.<Page<CommentResponse>>builder()
                .data(commentReplyService.findCommentReplyByCommentId(size, page, commentId))
                .build());
    }

    @SecurityRequirement(name = "BearerAuth")
    @DeleteMapping("/{id}")
    ResponseEntity<ApiResponse<Boolean>> delete(@PathVariable String id) {
        return ResponseEntity.status(HttpStatus.NO_CONTENT)
                .body(ApiResponse.<Boolean>builder()
                        .data(commentReplyService.deleteCommentReply(id))
                        .build());

    }
}
