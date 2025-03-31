package com.project.forum.controller;

import com.project.forum.dto.requests.post.CreatePostContentDto;
import com.project.forum.dto.requests.post.UpdatePostContentDto;
import com.project.forum.dto.responses.post.PostContentResponse;
import com.project.forum.dto.responses.post.PostPollResponse;
import com.project.forum.dto.responses.post.PostResponse;
import com.project.forum.exception.ApiResponse;
import com.project.forum.service.IPostContentService;
import com.project.forum.service.IPostPollService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RestController
@AllArgsConstructor
@RequestMapping("/post-content")
@Tag(name = "06. Post content")
public class PostContentController {
    IPostContentService postContentService;

    @SecurityRequirement(name = "BearerAuth")
    @GetMapping("/{postId}")
    ResponseEntity<ApiResponse<PostContentResponse>> getById(@PathVariable String postId) {
        return ResponseEntity.ok(ApiResponse.<PostContentResponse>builder()
                .data(postContentService.findPostContentByPostId(postId))
                .build());
    }

    @SecurityRequirement(name = "BearerAuth")
    @PostMapping()
    ResponseEntity<ApiResponse<PostResponse>> create(@RequestBody CreatePostContentDto createPostContentDto) throws IOException {
        return ResponseEntity.status(HttpStatus.CREATED).body(ApiResponse.<PostResponse>builder()
                .data(postContentService.create(createPostContentDto))
                .build());
    }

    @SecurityRequirement(name = "BearerAuth")
    @PatchMapping("/{postId}")
    ResponseEntity<ApiResponse<PostResponse>> update(@PathVariable String postId, @RequestBody UpdatePostContentDto updatePostContentDto) throws IOException {
     return ResponseEntity.status(HttpStatus.OK).body(ApiResponse.<PostResponse>builder()
                     .data(postContentService.update(postId,updatePostContentDto))
             .build())   ;
    }
}
