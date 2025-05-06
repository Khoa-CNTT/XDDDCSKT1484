package com.project.forum.controller;

import com.project.forum.dto.responses.post.PostTotalResponse;
import com.project.forum.dto.responses.post.TopInteractionPostResponse;
import com.project.forum.dto.responses.transaction.TransactionTotalResponse;
import com.project.forum.dto.responses.transaction.MonthlyRevenueResponse;
import com.project.forum.dto.responses.transaction.TopAmountPostResponse;
import com.project.forum.exception.ApiResponse;
import com.project.forum.service.IPostService;
import com.project.forum.service.ITransactionService;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.Parameters;
import io.swagger.v3.oas.annotations.enums.ParameterIn;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Collections;
import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/total")
@Tag(name = "22. total")
public class TotalController {

    IPostService postService;
    ITransactionService transactionService;

    @SecurityRequirement(name = "BearerAuth")
    @GetMapping("/count")
    public ResponseEntity<ApiResponse<PostTotalResponse>> getAllPost(
            @Parameter(
                    description = "Ngày bắt đầu (định dạng: yyyy-MM-dd)",
                    in = ParameterIn.QUERY,
                    required = false,
                    schema = @Schema(type = "string", format = "date")
            )
            @RequestParam(required = false) String start,

            @Parameter(
                    description = "Ngày kết thúc (định dạng: yyyy-MM-dd)",
                    in = ParameterIn.QUERY,
                    required = false,
                    schema = @Schema(type = "string", format = "date")
            )
            @RequestParam(required = false) String end) {

        LocalDateTime from = (start == null || start.isEmpty()) ? null : 
            LocalDate.parse(start, DateTimeFormatter.ISO_DATE).atStartOfDay();
        LocalDateTime to = (end == null || end.isEmpty()) ? null : 
            LocalDate.parse(end, DateTimeFormatter.ISO_DATE).atTime(23, 59, 59);

        return ResponseEntity.ok(
                ApiResponse.<PostTotalResponse>builder()
                        .data(postService.postTotal(from, to))
                        .build()
        );
    }

    @SecurityRequirement(name = "BearerAuth")
    @GetMapping("/revenue")
    public ResponseEntity<ApiResponse<TransactionTotalResponse>> getTotalRevenue() {
        return ResponseEntity.ok(
                ApiResponse.<TransactionTotalResponse>builder()
                        .data(transactionService.getTotalRevenue())
                        .build()
        );
    }

    @SecurityRequirement(name = "BearerAuth")
    @GetMapping("/revenue/monthly")
    public ResponseEntity<ApiResponse<MonthlyRevenueResponse>> getMonthlyRevenue(
            @Parameter(
                    description = "Năm cần lấy dữ liệu (mặc định là năm hiện tại)",
                    in = ParameterIn.QUERY,
                    required = false,
                    schema = @Schema(type = "integer", format = "int32")
            )
            @RequestParam(required = false) Integer year) {
        return ResponseEntity.ok(
                ApiResponse.<MonthlyRevenueResponse>builder()
                        .data(transactionService.getMonthlyRevenue(year))
                        .build()
        );
    }

    @SecurityRequirement(name = "BearerAuth")
    @GetMapping("/top-interactions")
    public ResponseEntity<ApiResponse<List<TopInteractionPostResponse>>> getTopInteractionPosts(
            @Parameter(
                    description = "Ngày bắt đầu (định dạng: yyyy-MM-dd)",
                    in = ParameterIn.QUERY,
                    required = false,
                    schema = @Schema(type = "string", format = "date")
            )
            @RequestParam(required = false) String start,

            @Parameter(
                    description = "Ngày kết thúc (định dạng: yyyy-MM-dd)",
                    in = ParameterIn.QUERY,
                    required = false,
                    schema = @Schema(type = "string", format = "date")
            )
            @RequestParam(required = false) String end,

            @Parameter(
                    description = "Số lượng bài post muốn lấy (mặc định là 5)",
                    in = ParameterIn.QUERY,
                    required = false,
                    schema = @Schema(type = "integer", format = "int32", defaultValue = "5")
            )
            @RequestParam(defaultValue = "5") Integer limit) {

        try {
            LocalDateTime from = (start == null || start.isEmpty()) ? null : 
                LocalDate.parse(start, DateTimeFormatter.ISO_DATE).atStartOfDay();
            LocalDateTime to = (end == null || end.isEmpty()) ? null : 
                LocalDate.parse(end, DateTimeFormatter.ISO_DATE).atTime(23, 59, 59);

            List<TopInteractionPostResponse> topPosts = postService.getTopInteractionPosts(from, to, limit);
            
            return ResponseEntity.ok(
                ApiResponse.<List<TopInteractionPostResponse>>builder()
                    .data(topPosts)
                    .build()
            );
        } catch (Exception e) {
            return ResponseEntity.ok(
                ApiResponse.<List<TopInteractionPostResponse>>builder()
                    .data(Collections.emptyList())
                    .build()
            );
        }
    }

    @SecurityRequirement(name = "BearerAuth")
    @GetMapping("/top-posts")
    public ResponseEntity<ApiResponse<List<TopAmountPostResponse>>> getTopPostsByAmount(
            @Parameter(
                    description = "Ngày bắt đầu (định dạng: yyyy-MM-dd)",
                    in = ParameterIn.QUERY,
                    required = false,
                    schema = @Schema(type = "string", format = "date")
            )
            @RequestParam(required = false) String start,
            @Parameter(
                    description = "Ngày kết thúc (định dạng: yyyy-MM-dd)",
                    in = ParameterIn.QUERY,
                    required = false,
                    schema = @Schema(type = "string", format = "date")
            )
            @RequestParam(required = false) String end,
            @Parameter(
                    description = "Số lượng bài viết cần lấy",
                    in = ParameterIn.QUERY,
                    required = false,
                    schema = @Schema(type = "integer", defaultValue = "10")
            )
            @RequestParam(defaultValue = "10") Integer limit) {

        LocalDateTime from = (start == null || start.isEmpty()) ? null : 
            LocalDate.parse(start, DateTimeFormatter.ISO_DATE).atStartOfDay();
        LocalDateTime to = (end == null || end.isEmpty()) ? null : 
            LocalDate.parse(end, DateTimeFormatter.ISO_DATE).atTime(23, 59, 59);

        return ResponseEntity.ok(
                ApiResponse.<List<TopAmountPostResponse>>builder()
                        .data(transactionService.getTopPostsByAmount(from, to, limit))
                        .build()
        );
    }
}
