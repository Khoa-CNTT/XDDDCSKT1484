package com.project.forum.service.implement;

import com.nimbusds.jose.*;
import com.nimbusds.jose.crypto.MACSigner;
import com.nimbusds.jwt.JWTClaimsSet;
import com.nimbusds.jwt.SignedJWT;
import com.project.forum.dto.requests.user.UpdatePasswordDto;
import com.project.forum.dto.responses.auth.IntrospectResponse;
import com.project.forum.dto.responses.mail.MailResponse;
import com.project.forum.enity.Users;
import com.project.forum.enums.ErrorCode;
import com.project.forum.enums.StatusUser;
import com.project.forum.exception.WebException;
import com.project.forum.repository.UsersRepository;
import com.project.forum.service.IAuthService;
import com.project.forum.service.ICacheService;
import com.project.forum.service.IMailService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Date;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class MailService implements IMailService {

    final JavaMailSender javaMailSender;

    final UsersRepository usersRepository;

    final PasswordEncoder passwordEncoder;

    final ICacheService iCacheService;

    final IAuthService iAuthService;

    @Value("${SECRET_KEY}")
    String secret_key;

    @Value("http://localhost:1407")
    String mail_url;

    @Override
    public MailResponse sendMailActive() {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        Users users = usersRepository.findByUsername(username)
                .orElseThrow(() -> new WebException(ErrorCode.E_USER_NOT_FOUND));
        if (users.getStatus().equals(StatusUser.ACTIVE)) {
            throw new WebException(ErrorCode.E_USER_IS_ACTIVE);
        }
        String token = generateTokenActive(users);
        SimpleMailMessage simpleMailMessage = new SimpleMailMessage();
        simpleMailMessage.setTo(users.getEmail());
        simpleMailMessage.setSubject("Forum Language");
        simpleMailMessage.setFrom("vietyts2003@gmail.com");
        simpleMailMessage.setText("Please click on the following link to verify your email.\n" +
                "Link is only valid for 5 minutes \n" +
                mail_url + "/confirmEmail?token=" + token);

        if (iCacheService.existData("user:" + users.getUsername() + "mail_active")) {
            iCacheService.deleteData("user:" + users.getUsername() + "mail_active");
        }
        iCacheService.saveDataWithTime("user:" + users.getUsername() + "mail_active", token, 3600L);
        javaMailSender.send(simpleMailMessage);

        return MailResponse.builder()
                .url(simpleMailMessage.toString())
                .token(token)
                .message("Send Mail Success")
                .success(true)
                .build();
    }

    @Override
    public MailResponse checkMailActive(String token) {
        IntrospectResponse check = iAuthService.introspect(token);
        if (check.isResult()) {
            try {
                SignedJWT signedJWT = SignedJWT.parse(token);
                String username = signedJWT.getJWTClaimsSet().getSubject().toString();
                Object checkActive = signedJWT.getJWTClaimsSet().getClaim(StatusUser.ACTIVE.toString());
                if (!checkActive.toString().equals(username)) {
                    throw new WebException(ErrorCode.E_TOKEN_INVALID);
                }
                Users users = usersRepository.findByUsername(username)
                        .orElseThrow(() -> new WebException(ErrorCode.E_USER_NOT_FOUND));
                if (users.getStatus().equals(StatusUser.ACTIVE)) {
                    throw new WebException(ErrorCode.E_USER_IS_ACTIVE);
                }
                users.setStatus(StatusUser.ACTIVE.toString());
                usersRepository.save(users);
                return MailResponse.builder()
                        .message("Active Success")
                        .success(true)
                        .build();
            } catch (ParseException e) {
                throw new WebException(ErrorCode.E_TOKEN_EXPIRED);
            }

        } else {
            throw new WebException(ErrorCode.E_TOKEN_EXPIRED);
        }
    }

    @Override
    public MailResponse sendMailChangePassword(String email) {
        Users users = usersRepository.findByEmail(email)
                .orElseThrow(() -> new WebException(ErrorCode.E_USER_NOT_FOUND));
        String token = generateTokenPassword(users);
        SimpleMailMessage simpleMailMessage = new SimpleMailMessage();
        simpleMailMessage.setTo(users.getEmail());
        simpleMailMessage.setSubject("Forum Language");
        simpleMailMessage.setFrom("vietyts2003@gmail.com");
        simpleMailMessage.setText("Please click on the following link to verify your email.\n" +
                "Link is only valid for 5 minutes \n" +
                mail_url + "/resetPassword?token=" + token);
        if (iCacheService.existData("user:" + users.getUsername() + "mail_password")) {
            iCacheService.deleteData("user:" + users.getUsername() + "mail_password");
        }
        iCacheService.saveDataWithTime("user:" + users.getUsername() + "mail_password", token, 3600L);
        javaMailSender.send(simpleMailMessage);

        return MailResponse.builder()
                .url(simpleMailMessage.toString())
                .token(token)
                .message("Send Mail Success")
                .success(true)
                .build();
    }

    @Override
    public MailResponse checkMailChangePassword(String token, UpdatePasswordDto updatePasswordDto) {
        IntrospectResponse check = iAuthService.introspect(token);
        if (check.isResult()) {
            try {
                SignedJWT signedJWT = SignedJWT.parse(token);
                String username = signedJWT.getJWTClaimsSet().getSubject().toString();
                Object checkActive = signedJWT.getJWTClaimsSet().getClaim("password");
                if (!checkActive.toString().equals(username)) {
                    throw new WebException(ErrorCode.E_TOKEN_INVALID);
                }
                Users users = usersRepository.findByUsername(username)
                        .orElseThrow(() -> new WebException(ErrorCode.E_USER_NOT_FOUND));
                if (!updatePasswordDto.getRePassword().equals(updatePasswordDto.getPassword())){
                    throw new WebException(ErrorCode.E_PASSWORD_NOT_MATCH);
                }
                users.setPassword(passwordEncoder.encode(updatePasswordDto.getPassword()));
                usersRepository.save(users);
                return MailResponse.builder()
                        .message("Password change Success")
                        .success(true)
                        .build();
            } catch (ParseException e) {
                throw new WebException(ErrorCode.E_TOKEN_EXPIRED);
            }

        } else {
            throw new WebException(ErrorCode.E_TOKEN_EXPIRED);
        }
    }

    public String generateTokenActive(Users users) {
        JWSHeader jwsHeader = new JWSHeader(JWSAlgorithm.HS256);
        JWTClaimsSet jwtClaimsSet = new JWTClaimsSet.Builder()
                .subject(users.getUsername())
                .issuer("ForumLanguage")
                .issueTime(new Date())
                .expirationTime(new Date(
                        Instant.now().plus(5, ChronoUnit.MINUTES).toEpochMilli()
                ))
                .jwtID(UUID.randomUUID().toString())
                .claim(StatusUser.ACTIVE.toString(), users.getUsername())
                .build();
        Payload payload = new Payload(jwtClaimsSet.toJSONObject());
        JWSObject jwsObject = new JWSObject(jwsHeader, payload);
        try {
            jwsObject.sign(new MACSigner(secret_key.getBytes()));
        } catch (JOSEException e) {
        }
        return jwsObject.serialize().toString();
    }

    public String generateTokenPassword(Users users) {
        JWSHeader jwsHeader = new JWSHeader(JWSAlgorithm.HS256);
        JWTClaimsSet jwtClaimsSet = new JWTClaimsSet.Builder()
                .subject(users.getUsername())
                .issuer("ForumLanguage")
                .issueTime(new Date())
                .expirationTime(new Date(
                        Instant.now().plus(5, ChronoUnit.MINUTES).toEpochMilli()
                ))
                .jwtID(UUID.randomUUID().toString())
                .claim("password", users.getUsername())
                .build();
        Payload payload = new Payload(jwtClaimsSet.toJSONObject());
        JWSObject jwsObject = new JWSObject(jwsHeader, payload);
        try {
            jwsObject.sign(new MACSigner(secret_key.getBytes()));
        } catch (JOSEException e) {
        }
        return jwsObject.serialize().toString();
    }
}
