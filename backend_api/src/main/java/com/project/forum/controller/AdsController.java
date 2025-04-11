package com.project.forum.controller;

import com.project.forum.dto.responses.ads.AdsResponse;
import com.project.forum.exception.ApiResponse;
import com.project.forum.service.IAdsService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@AllArgsConstructor
@RequestMapping("/ads")
@Tag(name = "19. Ads")
public class AdsController {

    IAdsService iAdsService;

    @SecurityRequirement(name = "BearerAuth")
    @GetMapping
    ResponseEntity<ApiResponse<Page<AdsResponse>>> getAll(@RequestParam(defaultValue = "0") Integer page,
                                                          @RequestParam(defaultValue = "10") Integer size) {
        return ResponseEntity.ok(ApiResponse.<Page<AdsResponse>>builder()
                .data(iAdsService.findAll(page, size))
                .build());
    }
    @SecurityRequirement(name = "BearerAuth")
    @GetMapping("/user")
    ResponseEntity<ApiResponse<Page<AdsResponse>>> getAllByUser(@RequestParam(defaultValue = "0") Integer page,
                                                          @RequestParam(defaultValue = "10") Integer size) {
        return ResponseEntity.ok(ApiResponse.<Page<AdsResponse>>builder()
                .data(iAdsService.findAllByUser(page, size))
                .build());
    }



}
