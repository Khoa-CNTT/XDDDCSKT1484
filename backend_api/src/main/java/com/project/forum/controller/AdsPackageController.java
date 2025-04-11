package com.project.forum.controller;

import com.project.forum.dto.requests.ads.AdsPackageRequest;
import com.project.forum.dto.responses.ads.AdsPackageResponse;
import com.project.forum.exception.ApiResponse;
import com.project.forum.service.IAdsPackageService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@AllArgsConstructor
@RequestMapping("/ads-package")
@Tag(name = "16. Ads Package")
public class AdsPackageController {

    IAdsPackageService adsPackage;

    @SecurityRequirement(name = "BearerAuth")
    @GetMapping
    ResponseEntity<ApiResponse<Page<AdsPackageResponse>>> findAll(@RequestParam(defaultValue = "0") Integer page,
                                                                  @RequestParam(defaultValue = "10") Integer size) {
        return ResponseEntity.ok(ApiResponse.<Page<AdsPackageResponse>>builder()
                .data(adsPackage.findAll(page, size))
                .build());

    }

    @SecurityRequirement(name = "BearerAuth")
    @PostMapping
    ResponseEntity<ApiResponse<AdsPackageResponse>> save(@RequestBody AdsPackageRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(ApiResponse.<AdsPackageResponse>builder()
                .data(adsPackage.create(request))
                .build());
    }

    @SecurityRequirement(name = "BearerAuth")
    @PutMapping("/{id}")
    ResponseEntity<ApiResponse<AdsPackageResponse>> update(@PathVariable("id") String id, @RequestBody AdsPackageRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(ApiResponse.<AdsPackageResponse>builder()
                .data(adsPackage.update(id, request))
                .build());
    }

    @SecurityRequirement(name = "BearerAuth")
    @GetMapping("/{id}")
    ResponseEntity<ApiResponse<AdsPackageResponse>> findById(@PathVariable("id") String id) {
        return ResponseEntity.status(HttpStatus.CREATED).body(ApiResponse.<AdsPackageResponse>builder()
                .data(adsPackage.findById(id))
                .build());
    }

    @SecurityRequirement(name = "BearerAuth")
    @DeleteMapping("/{id}")
    ResponseEntity<ApiResponse<Boolean>> delete(@PathVariable("id") String id) {
        return ResponseEntity.ok(ApiResponse.<Boolean>builder()
                .data(adsPackage.delete(id))
                .build());
    }

}