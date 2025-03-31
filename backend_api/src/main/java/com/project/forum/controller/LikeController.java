package com.project.forum.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.project.forum.dto.requests.like.CreateLikeDto;
import com.project.forum.dto.responses.like.LikeResponse;
import com.project.forum.exception.ApiResponse;
import com.project.forum.service.ILikeService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@AllArgsConstructor
@RequestMapping("/likes")
@Tag(name = "08. Likes")
public class LikeController {

    ILikeService likeService;


    @SecurityRequirement(name = "BearerAuth")
    @PostMapping("/action")
    ResponseEntity<ApiResponse<LikeResponse>> actionLike(@RequestBody() CreateLikeDto createLikeDto) throws JsonProcessingException {
        return ResponseEntity.ok(ApiResponse.<LikeResponse>builder()
                .data(likeService.actionLike(createLikeDto))
                .build());

    }


}
