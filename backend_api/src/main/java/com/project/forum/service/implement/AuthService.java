package com.project.forum.service.implement;

import com.nimbusds.jose.*;
import com.nimbusds.jose.crypto.MACSigner;
import com.nimbusds.jose.crypto.MACVerifier;
import com.nimbusds.jwt.JWTClaimsSet;
import com.nimbusds.jwt.SignedJWT;
import com.project.forum.dto.requests.auth.AuthRequestDto;
import com.project.forum.dto.responses.auth.AuthResponse;
import com.project.forum.dto.responses.auth.IntrospectResponse;
import com.project.forum.enity.Users;
import com.project.forum.enums.ErrorCode;
import com.project.forum.enums.StatusUser;
import com.project.forum.exception.WebException;
import com.project.forum.repository.UsersRepository;
import com.project.forum.service.IAuthService;
import com.project.forum.service.ICacheService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;


import java.text.ParseException;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Date;
import java.util.StringJoiner;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class AuthService implements IAuthService {

    final UsersRepository usersRepository;

    final PasswordEncoder passwordEncoder;

    final ICacheService iCacheService;
    @Value("${SECRET_KEY}")
    String secret_key;

    public AuthResponse login(AuthRequestDto authRequestDto) {
        Users user = usersRepository
                .findByUsername(authRequestDto.getUsername())
                .orElseThrow(() -> new WebException(ErrorCode.E_USER_NOT_FOUND));
        boolean check = passwordEncoder.matches(authRequestDto.getPassword(), user.getPassword());
        if (!check) {
            throw new WebException(ErrorCode.E_WRONG_PASSWORD);
        }
        String token = generateToken(user);
        if (user.getStatus().equals(StatusUser.LOCKED.toString())){
            throw new WebException(ErrorCode.E_USER_IS_LOCKED);
        }
        if (iCacheService.getData("user:" + user.getUsername() + "token") != null) {
            iCacheService.deleteData("user:" + user.getUsername() + "token");
        }
        iCacheService.saveDataWithTime("user:" + user.getUsername() + "token", token, 3600000L);

        return AuthResponse.builder()
                .token(token)
                .authorized(check)
                .build();
    }

    @Override
    public IntrospectResponse introspect(String token) {
        boolean valid = true;
        try {
            verify(token);
        } catch (Exception e) {
            valid = false;
        }
        return IntrospectResponse.builder()
                .result(valid)
                .build();
    }

    @Override
    public AuthResponse logout(String token) {
        try {
            SignedJWT signedJWT = verify(token);
            iCacheService.saveDataWithTime("expired_token", token,3600000L);
            return AuthResponse.builder()
                    .authorized(true)
                    .build();
        } catch (JOSEException e) {
            throw new WebException(ErrorCode.E_TOKEN_EXPIRED);
        } catch (ParseException e) {
            throw new WebException(ErrorCode.E_TOKEN_EXPIRED);
        }

    }

    @Override
    public AuthResponse refresh(String refreshToken) {
        try {
            SignedJWT signedJWT = verify(refreshToken);
            String username = signedJWT.getJWTClaimsSet().getSubject();
            Users users = usersRepository.findByUsername(username)
                    .orElseThrow(() -> new WebException(ErrorCode.E_USER_NOT_FOUND));
            iCacheService.saveDataWithTime("expired_token", refreshToken, 3600000L);
            String token = generateToken(users);
            return AuthResponse.builder()
                    .authorized(true)
                    .token(token)
                    .build();

        } catch (JOSEException e) {
            throw new WebException(ErrorCode.E_TOKEN_EXPIRED);
        } catch (ParseException e) {
            throw new WebException(ErrorCode.E_TOKEN_EXPIRED);
        }
    }

    @Override
    public AuthResponse checkActive(String token) {
        try {
            SignedJWT signedJWT = verify(token);
            String username = signedJWT.getJWTClaimsSet().getSubject();
            Users users = usersRepository.findByUsername(username)
                    .orElseThrow(() -> new WebException(ErrorCode.E_USER_NOT_FOUND));
            if (users.getStatus().equals(StatusUser.ACTIVE.toString())){
                return AuthResponse.builder()
                        .authorized(true)
                        .token(token)
                        .build();
            } else {
                return AuthResponse.builder()
                        .authorized(false)
                        .token(token)
                        .build();
            }
        } catch (JOSEException e) {
            throw new WebException(ErrorCode.E_TOKEN_EXPIRED);
        } catch (ParseException e) {
            throw new WebException(ErrorCode.E_TOKEN_EXPIRED);
        }

    }

    @Override
    public String extractToken(HttpServletRequest request) {
        String authHeader = request.getHeader("Authorization");
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            return authHeader.substring(7);
        }
        return request.getParameter("token");
    }

    @Override
    public String getUserIdFromToken(String token) {
        try {
            SignedJWT signedJWT = verify(token);
            String username = signedJWT.getJWTClaimsSet().getSubject();
            Users users = usersRepository.findByUsername(username).orElseThrow(() -> new WebException(ErrorCode.E_USER_NOT_FOUND));
            return users.getId();

        } catch (JOSEException e) {
            throw new WebException(ErrorCode.E_TOKEN_EXPIRED);
        } catch (ParseException e) {
            throw new WebException(ErrorCode.E_TOKEN_EXPIRED);
        }

    }

    SignedJWT verify(String token) throws JOSEException, ParseException {
        JWSVerifier verifier = new MACVerifier(secret_key.getBytes());
        SignedJWT signedJWT = SignedJWT.parse(token);
        Date expiration = signedJWT.getJWTClaimsSet().getExpirationTime();
        var verify = signedJWT.verify(verifier);
        if (!(verify || expiration.before(new Date())))
            throw new WebException(ErrorCode.E_TOKEN_EXPIRED);
        if (iCacheService.getData("expired_token") == token) {
            throw new WebException(ErrorCode.E_TOKEN_EXPIRED);
        }

        return signedJWT;
    }


    public String generateToken(Users users) {
        JWSHeader jwsHeader = new JWSHeader(JWSAlgorithm.HS256);
        JWTClaimsSet jwtClaimsSet = new JWTClaimsSet.Builder()
                .subject(users.getUsername())
                .issuer("ForumLanguage")
                .issueTime(new Date())
                .expirationTime(new Date(
                        Instant.now().plus(60, ChronoUnit.MINUTES).toEpochMilli()
                ))
                .jwtID(UUID.randomUUID().toString())
                .claim("scope", buildScope(users))
                .build();
        Payload payload = new Payload(jwtClaimsSet.toJSONObject());
        JWSObject jwsObject = new JWSObject(jwsHeader, payload);
        try {
            jwsObject.sign(new MACSigner(secret_key.getBytes()));
        } catch (JOSEException e) {
        }
        return jwsObject.serialize().toString();
    }

    public String buildScope(Users users) {
        StringJoiner stringJoiner = new StringJoiner(" ");
        if (!CollectionUtils.isEmpty(users.getRoles())) {
            users.getRoles().forEach(role -> stringJoiner.add(role.getName()));
        }

        return stringJoiner.toString();
    }


}
