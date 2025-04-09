package com.project.forum.controller;

import com.project.forum.dto.responses.post.PostContentHistoryResponse;
import com.project.forum.exception.ApiResponse;
import com.project.forum.service.IPostContentHistoryService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@AllArgsConstructor
@RequestMapping("/post-content-history")
@Tag(name = "21. Post content History")
public class PostContentHistoryController {

    IPostContentHistoryService postContentHistoryService;

    @SecurityRequirement(name = "BearerAuth")
    @GetMapping("/{postId}")
    ResponseEntity<ApiResponse<Page<PostContentHistoryResponse>>> getByPostId(@PathVariable String postId,
                                                                              @RequestParam(defaultValue = "0") Integer page,
                                                                              @RequestParam(defaultValue = "10") Integer size) {
        return ResponseEntity.ok(ApiResponse.<Page<PostContentHistoryResponse>>builder()
                .data(postContentHistoryService.getByPostId(postId, page, size))
                .build());

    }

}
