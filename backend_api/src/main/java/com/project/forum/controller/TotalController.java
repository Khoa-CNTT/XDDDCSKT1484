package com.project.forum.controller;

import com.project.forum.dto.responses.post.PostTotalResponse;
import com.project.forum.exception.ApiResponse;
import com.project.forum.service.IPostService;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.enums.ParameterIn;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;


@RestController
@AllArgsConstructor
@RequestMapping("/total")
@Tag(name = "22. total")
public class TotalController {

    IPostService postService;

    @SecurityRequirement(name = "BearerAuth")
    @GetMapping("/count")
    public ResponseEntity<ApiResponse<PostTotalResponse>> getAllPost(
            @Parameter(
                    description = "Ngày bắt đầu (định dạng: yyyy-MM-dd'T'HH:mm:ss)",
                    in = ParameterIn.QUERY,
                    required = false,
                    schema = @Schema(type = "string", format = "date-time")
            )
            @RequestParam(required = false) String start,

            @Parameter(
                    description = "Ngày kết thúc (định dạng: yyyy-MM-dd'T'HH:mm:ss)",
                    in = ParameterIn.QUERY,
                    required = false,
                    schema = @Schema(type = "string", format = "date-time")
            )
            @RequestParam(required = false) String end) {

        LocalDateTime from = (start == null || start.isEmpty()) ? null : LocalDateTime.parse(start);
        LocalDateTime to = (end == null || end.isEmpty()) ? null : LocalDateTime.parse(end);

        return ResponseEntity.ok(
                ApiResponse.<PostTotalResponse>builder()
                        .data(postService.postTotal(from, to))
                        .build()
        );
    }


}
