package com.project.forum.controller;

import com.project.forum.dto.responses.post.PostRepostMessage;
import com.project.forum.dto.responses.post.PostRepostResponse;
import com.project.forum.exception.ApiResponse;
import com.project.forum.service.IPostReport;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@AllArgsConstructor
@RequestMapping("/reports")
@Tag(name = "18. Report")
public class PostRepostController {

    IPostReport postReport;
    @SecurityRequirement(name = "BearerAuth")
    @GetMapping()
    ResponseEntity<ApiResponse<Page<PostRepostResponse>>> getAll(@RequestParam(defaultValue = "0") Integer page,
                                                                 @RequestParam(defaultValue = "10") Integer size,
                                                                 @RequestParam(defaultValue = "") String postId) {
        return ResponseEntity.ok(ApiResponse.<Page<PostRepostResponse>>builder()
                .data(postReport.getAll(page, size, postId))
                .build());
    }
    @SecurityRequirement(name = "BearerAuth")
    @DeleteMapping("/{id}")
    ResponseEntity<ApiResponse<PostRepostMessage>> delete(@PathVariable String id) {
        return ResponseEntity.ok(ApiResponse.<PostRepostMessage>builder()
                .data(postReport.delete(id))
                .build());
    }
    @SecurityRequirement(name = "BearerAuth")
    @PatchMapping("/{id}")
    ResponseEntity<ApiResponse<PostRepostMessage>> update(@PathVariable String id) {
        return ResponseEntity.ok(ApiResponse.<PostRepostMessage>builder()
                .data(postReport.updateStatus(id))
                .build());
    }

}
