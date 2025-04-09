package com.project.forum.controller;

import com.project.forum.dto.responses.vnpay.VnPayResponse;
import com.project.forum.enums.TypePost;
import com.project.forum.exception.ApiResponse;
import com.project.forum.service.IVNPayService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@AllArgsConstructor
@RequestMapping("/vn-pay")
@Tag(name = "20. VNPAY")
public class VNPayController {

    IVNPayService iVNPayService;

    @SecurityRequirement(name = "BearerAuth")
    @GetMapping("/submitOrder")
    public ResponseEntity<ApiResponse<VnPayResponse>> create(HttpServletRequest request,
                                                             @RequestParam String location,
                                                             @RequestParam TypePost type,
                                                             @RequestParam String idHandler,
                                                             @RequestParam String sales_package) {
        return ResponseEntity.ok(ApiResponse.<VnPayResponse>builder()
                .data(iVNPayService.createOrder(request, location,type.getPost(),idHandler,sales_package))
                .build());
    }

    @SecurityRequirement(name = "BearerAuth")
    @GetMapping("/orderReturn")
    public ResponseEntity<ApiResponse<VnPayResponse>> orderReturn(HttpServletRequest request) {
        return ResponseEntity.ok(ApiResponse.<VnPayResponse>builder()
                .data(iVNPayService.orderReturn(request))
                .build());
    }

}
