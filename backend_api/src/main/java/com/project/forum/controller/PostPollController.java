package com.project.forum.controller;

import com.project.forum.dto.requests.post.CreatePostPollDto;
import com.project.forum.dto.responses.post.PostPollResponse;
import com.project.forum.dto.responses.post.PostResponse;
import com.project.forum.exception.ApiResponse;
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
@RequestMapping("/post-poll")
@Tag(name = "05. Post Poll")
public class PostPollController {
    IPostPollService postPollService;

    @SecurityRequirement(name = "BearerAuth")
    @GetMapping("/{postId}")
    ResponseEntity<ApiResponse<PostPollResponse>> getById(@PathVariable String postId) {
        return ResponseEntity.ok(ApiResponse.<PostPollResponse>builder()
                .data(postPollService.findPostPollByPostId(postId))
                .build());
    }

    @SecurityRequirement(name = "BearerAuth")
    @PostMapping()
    ResponseEntity<ApiResponse<PostResponse>> create(@RequestBody CreatePostPollDto createPostPollDto) throws IOException {
        return ResponseEntity.status(HttpStatus.CREATED).body(ApiResponse.<PostResponse>builder()
                .data(postPollService.create(createPostPollDto))
                .build());
    }
}
