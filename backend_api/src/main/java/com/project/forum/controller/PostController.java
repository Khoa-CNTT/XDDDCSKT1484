package com.project.forum.controller;

import com.project.forum.dto.requests.post.PostShowRequest;
import com.project.forum.dto.responses.post.PostResponse;
import com.project.forum.exception.ApiResponse;
import com.project.forum.service.IPostService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@AllArgsConstructor
@RequestMapping("/posts")
@Tag(name = "04. Post")
public class PostController {

    IPostService postService;

    @SecurityRequirement(name = "BearerAuth")
    @GetMapping()
    ResponseEntity<ApiResponse<Page<PostResponse>>> findAll(@RequestParam(defaultValue = "0") Integer page,
                                                            @RequestParam(defaultValue = "10") Integer size,
                                                            @RequestParam(defaultValue = "") String language,
                                                            @RequestParam(defaultValue = "") String content) {
        return ResponseEntity.ok(ApiResponse.<Page<PostResponse>>builder()
                .data(postService.findAllPost(page, size, content, language))
                .build());
    }

    @SecurityRequirement(name = "BearerAuth")
    @GetMapping("{id}")
    ResponseEntity<ApiResponse<PostResponse>> findById(@PathVariable String id) {
        return ResponseEntity.ok(ApiResponse.<PostResponse>builder()
                .data(postService.findPostById(id))
                .build());
    }

    @SecurityRequirement(name = "BearerAuth")
    @GetMapping("/user")
    ResponseEntity<ApiResponse<Page<PostResponse>>> userPost(
            @RequestParam(defaultValue = "0") Integer page,
            @RequestParam(defaultValue = "10") Integer size
    ) {
        return ResponseEntity.ok(ApiResponse.<Page<PostResponse>>builder()
                .data(postService.userPost(page, size))
                .build());
    }

    @SecurityRequirement(name = "BearerAuth")
    @GetMapping("/user/{id}")
    ResponseEntity<ApiResponse<Page<PostResponse>>> getUserPost(
            @PathVariable String id,
            @RequestParam(defaultValue = "0") Integer page,
            @RequestParam(defaultValue = "10") Integer size
    ) {
        return ResponseEntity.ok(ApiResponse.<Page<PostResponse>>builder()
                .data(postService.findPostByIdUser(id,page, size))
                .build());
    }
    @SecurityRequirement(name = "BearerAuth")
    @DeleteMapping("/{id}")
    ResponseEntity<ApiResponse<Boolean>> delete(@PathVariable String id) {
        return ResponseEntity.ok(ApiResponse.<Boolean>builder()
                .data(postService.deletePostById(id))
                .build());
    }

    @SecurityRequirement(name = "BearerAuth")
    @GetMapping("/find")
    ResponseEntity<ApiResponse<Page<PostResponse>>> findAllAdmin(@RequestParam(defaultValue = "0") Integer page,
                                                            @RequestParam(defaultValue = "10") Integer size,
                                                            @RequestParam(defaultValue = "") String language,
                                                            @RequestParam(defaultValue = "") String content) {
        return ResponseEntity.ok(ApiResponse.<Page<PostResponse>>builder()
                .data(postService.findAllPostAdmin(page, size, content, language))
                .build());
    }
    @SecurityRequirement(name = "BearerAuth")
    @PatchMapping("/{id}/status")
    ResponseEntity<ApiResponse<PostResponse>> setStatus(@PathVariable String id, @RequestBody PostShowRequest postShowRequest) {
        return ResponseEntity.ok(ApiResponse.<PostResponse>builder()
                .data(postService.showPostById(id,postShowRequest))
                .build());
    }
}
