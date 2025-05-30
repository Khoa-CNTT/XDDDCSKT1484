package com.project.forum.configuration;

import com.project.forum.service.IAuthService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.oauth2.jose.jws.MacAlgorithm;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.oauth2.jwt.JwtException;
import org.springframework.security.oauth2.jwt.NimbusJwtDecoder;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;
import java.util.Objects;

@Configuration
@RequiredArgsConstructor
public class JwtDecoderCustom implements JwtDecoder {
    @Value("${SECRET_KEY}")
    String secret_key;
    NimbusJwtDecoder nimbusJwtDecoder;
    final IAuthService authService;

    @Override
    public Jwt decode(String token) throws JwtException {
        HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes()).getRequest();
        String path = request.getRequestURI();

        if (!path.equals("/mail/send-mail/active")) {
            if (!authService.introspect(token).isResult()) {
                throw new JwtException("Token is not active");
            }
            if (!authService.checkActive(token).isAuthorized()) {
                throw new JwtException("Token is not active");
            }
        }

        if (Objects.isNull(nimbusJwtDecoder)) {
            SecretKey secretKey = new SecretKeySpec(secret_key.getBytes(), "HS256");
            nimbusJwtDecoder = NimbusJwtDecoder.withSecretKey(secretKey).macAlgorithm(MacAlgorithm.HS256).build();
        }
        return nimbusJwtDecoder.decode(token);
    }
}
