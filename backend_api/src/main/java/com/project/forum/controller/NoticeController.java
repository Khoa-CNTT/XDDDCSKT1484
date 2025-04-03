package com.project.forum.controller;

import com.project.forum.dto.responses.notices.NoticeResponse;
import com.project.forum.exception.ApiResponse;
import com.project.forum.service.INoticeService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@AllArgsConstructor
@RequestMapping("/notices")
@Tag(name = "17. Notices")
public class NoticeController {

    INoticeService noticeService;

    @SecurityRequirement(name = "BearerAuth")
    @GetMapping
    ResponseEntity<ApiResponse<Page<NoticeResponse>>> getNotices(@RequestParam(defaultValue = "0") Integer page,
                                                                 @RequestParam(defaultValue = "10") Integer size) {
        Pageable pageable = PageRequest.of(page, size);
        return ResponseEntity.ok(ApiResponse.<Page<NoticeResponse>>builder()
                        .data(noticeService.getNotices(pageable))
                .build());
    }

    @SecurityRequirement(name = "BearerAuth")
    @GetMapping("/read")
    ResponseEntity<ApiResponse<Integer>> getRead() {
        return ResponseEntity.ok(ApiResponse.<Integer>builder()
                .data(noticeService.getNumberNoRead())
                .build());
    }

    @SecurityRequirement(name = "BearerAuth")
    @PutMapping("/read")
    ResponseEntity<ApiResponse<Boolean>> readNotice() {
        return ResponseEntity.ok(ApiResponse.<Boolean>builder()
                .data(noticeService.readNotices())
                .build());
    }

}
