package com.project.forum.controller;

import com.project.forum.dto.responses.ads.AdsTotalResponse;
import com.project.forum.dto.responses.ads.TopSpenderResponse;
import com.project.forum.exception.ApiResponse;
import com.project.forum.service.IAdsService;
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
    public ResponseEntity<ApiResponse<List<TopSpenderResponse>>> getTopSpenders() {
        return ResponseEntity.ok(
                ApiResponse.<List<TopSpenderResponse>>builder()
                        .data(adsService.getTopSpenders())
                        .build()
        );
    }
}