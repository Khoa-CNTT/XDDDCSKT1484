package com.project.forum.controller;

import com.project.forum.dto.requests.email.ChangePasswordDto;
import com.project.forum.dto.requests.user.UpdatePasswordDto;
import com.project.forum.dto.responses.mail.MailResponse;
import com.project.forum.exception.ApiResponse;
import com.project.forum.service.IMailService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@AllArgsConstructor
@RequestMapping("/mail")
@Tag(name = "03. Mail")
public class MailController {

    IMailService mailService;


    @GetMapping("/active")
    ResponseEntity<ApiResponse<MailResponse>> activeUser(@RequestParam String token) {
        return ResponseEntity.ok(ApiResponse.<MailResponse>builder()
                .data(mailService.checkMailActive(token))
                .build());
    }

    @PostMapping("/send-mail/change-password")
    ResponseEntity<ApiResponse<MailResponse>> sendMailChangePassword(@RequestBody ChangePasswordDto changePasswordDto) {
        return ResponseEntity.ok(ApiResponse.<MailResponse>builder()
                .data(mailService.sendMailChangePassword(changePasswordDto.getEmail()))
                .build());
    }

    @PostMapping("/change-password")
    ResponseEntity<ApiResponse<MailResponse>> changePassword(@RequestParam String token ,@RequestBody UpdatePasswordDto updatePasswordDto) {
        return ResponseEntity.ok(ApiResponse.<MailResponse>builder()
                .data(mailService.checkMailChangePassword(token,updatePasswordDto))
                .build());
    }

    @SecurityRequirement(name = "BearerAuth")
    @GetMapping("/send-mail/active")
    ResponseEntity<ApiResponse<MailResponse>> sendMailActive() {
        return ResponseEntity.ok(ApiResponse.<MailResponse>builder()
                .data(mailService.sendMailActive())
                .build());
    }

}
