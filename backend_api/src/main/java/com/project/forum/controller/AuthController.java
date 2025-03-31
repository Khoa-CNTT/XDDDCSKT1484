package com.project.forum.controller;

import com.project.forum.dto.requests.auth.AuthRequestDto;
import com.project.forum.dto.requests.auth.TokenRequestDto;
import com.project.forum.dto.requests.user.CreateUserDto;
import com.project.forum.dto.responses.auth.AuthResponse;
import com.project.forum.dto.responses.auth.IntrospectResponse;
import com.project.forum.dto.responses.user.UserResponse;
import com.project.forum.exception.ApiResponse;
import com.project.forum.service.IAuthService;
import com.project.forum.service.IUserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@AllArgsConstructor
@RequestMapping("/auth")
@Tag(name = "01. Authentication")
public class AuthController {

    IAuthService authService;
    IUserService userService;

    @PostMapping("/register")
    ResponseEntity<ApiResponse<UserResponse>> create(@RequestBody(required = true) CreateUserDto createUserDto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(ApiResponse.<UserResponse>builder()
                .data(userService.create(createUserDto))
                .build());
    }

    @PostMapping("/login")
    @Operation(summary = "Login")
    ResponseEntity<ApiResponse<AuthResponse>> login(@RequestBody(required = true) AuthRequestDto authRequestDto) {
        return ResponseEntity.ok(ApiResponse.<AuthResponse>builder()
                .data(authService.login(authRequestDto))
                .build());
    }

    @PostMapping("/logout")
    @Operation(summary = "Logout")
    ResponseEntity<ApiResponse<AuthResponse>> logout(@RequestBody(required = true) TokenRequestDto tokenRequestDto) {
        return ResponseEntity.ok(ApiResponse.<AuthResponse>builder()
                .data(authService.logout(tokenRequestDto.getToken()))
                .build());
    }

    @PostMapping("/introspect-token")
    @Operation(summary = "Introspect Token")
    ResponseEntity<ApiResponse<IntrospectResponse>> introspect(@RequestBody(required = true) TokenRequestDto tokenRequestDto) {
        return ResponseEntity.ok(ApiResponse.<IntrospectResponse>builder()
                .data(authService.introspect(tokenRequestDto.getToken()))
                .build());
    }

    @PostMapping("/refresh-token")
    @Operation(summary = "Refresh Token")
    ResponseEntity<ApiResponse<AuthResponse>> refresh(@RequestBody(required = true) TokenRequestDto tokenRequestDto) {
        return ResponseEntity.ok(ApiResponse.<AuthResponse>builder()
                .data(authService.refresh(tokenRequestDto.getToken()))
                .build());
    }

    @PostMapping("/check-active")
    @Operation(summary = "Check Active")
    ResponseEntity<ApiResponse<AuthResponse>> checkActive(@RequestBody(required = true) TokenRequestDto tokenRequestDto) {
        return ResponseEntity.ok(ApiResponse.<AuthResponse>builder()
                .data(authService.checkActive(tokenRequestDto.getToken()))
                .build());
    }

}
