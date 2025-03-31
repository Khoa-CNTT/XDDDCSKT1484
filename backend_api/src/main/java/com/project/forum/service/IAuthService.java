package com.project.forum.service;

import com.project.forum.dto.requests.auth.AuthRequestDto;
import com.project.forum.dto.responses.auth.AuthResponse;
import com.project.forum.dto.responses.auth.IntrospectResponse;
import jakarta.servlet.http.HttpServletRequest;

public interface IAuthService {

    AuthResponse login(AuthRequestDto authRequestDto);

    IntrospectResponse introspect(String token);

    AuthResponse logout(String token);

    AuthResponse refresh(String refreshToken);

    AuthResponse checkActive(String token);

    String extractToken(HttpServletRequest request);

    String getUserIdFromToken(String token);
}
