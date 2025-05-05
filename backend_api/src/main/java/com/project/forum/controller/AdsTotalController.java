package com.project.forum.controller;

import com.project.forum.dto.responses.ads.AdsTotalResponse;
import com.project.forum.dto.responses.ads.TopSpenderResponse;
import com.project.forum.dto.responses.transaction.TopAmountPostResponse;
import com.project.forum.dto.responses.ads.RecentAdsPostResponse;
import com.project.forum.exception.ApiResponse;
import com.project.forum.service.IAdsService;
import com.project.forum.service.ITransactionService;
import io.swagger.v3.oas.annotations.Parameter;
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
import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/ads-total")
@Tag(name = "23. Ads Total")
public class AdsTotalController {

    IAdsService adsService;
    ITransactionService transactionService;

    @SecurityRequirement(name = "BearerAuth")
    @GetMapping("/count")
    public ResponseEntity<ApiResponse<AdsTotalResponse>> getAdsStats(
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
                ApiResponse.<AdsTotalResponse>builder()
                        .data(adsService.adsTotal(from, to))
                        .build()
        );
    }

    @SecurityRequirement(name = "BearerAuth")
    @GetMapping("/count/user")
    public ResponseEntity<ApiResponse<AdsTotalResponse>> getAdsStatsByUser(
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
                ApiResponse.<AdsTotalResponse>builder()
                        .data(adsService.adsTotalByUser(from, to))
                        .build()
        );
    }

    @SecurityRequirement(name = "BearerAuth")
    @GetMapping("/top-spenders")
    public ResponseEntity<ApiResponse<List<TopSpenderResponse>>> getTopSpenders(
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
                    description = "Số lượng người dùng cần lấy",
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
                ApiResponse.<List<TopSpenderResponse>>builder()
                        .data(adsService.getTopSpenders(from, to, limit))
                        .build()
        );
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

    @SecurityRequirement(name = "BearerAuth")
    @GetMapping("/recent-posts")
    public ResponseEntity<ApiResponse<List<RecentAdsPostResponse>>> getRecentAdsPosts(
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
                ApiResponse.<List<RecentAdsPostResponse>>builder()
                        .data(adsService.getRecentAdsPosts(from, to, limit))
                        .build()
        );
    }
}