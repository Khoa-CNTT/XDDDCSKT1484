package com.project.forum.configuration;

import com.project.forum.enity.Language;
import com.project.forum.enity.Roles;
import com.project.forum.enity.Users;
import com.project.forum.enums.ErrorCode;
import com.project.forum.enums.LanguageCode;
import com.project.forum.enums.RolesCode;
import com.project.forum.enums.StatusUser;
import com.project.forum.exception.WebException;
import com.project.forum.repository.LanguageRepository;
import com.project.forum.repository.RolesRepository;
import com.project.forum.repository.UsersRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.ApplicationRunner;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Role;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.*;

@Configuration
@RequiredArgsConstructor
public class StartUpRunner {

    private final UsersRepository usersRepository;
    private final PasswordEncoder passwordEncoder;
    private final RolesRepository rolesRepository;
    private final LanguageRepository languageRepository;



    @Bean@ConditionalOnProperty(
            prefix = "spring.datasource",
            name = "driver-class-name",
            havingValue = "com.mysql.cj.jdbc.Driver")
    ApplicationRunner initAdminUser() {
        return args -> {
            // Tạo role ADMIN nếu chưa tồn tại
//            Roles adminRole = rolesRepository.findByName(RolesCode.ADMIN.toString())
//                    .orElseGet(() -> rolesRepository.save(Roles.builder()
//                            .name(RolesCode.ADMIN.toString())
//                            .description("Admin Role")
//                            .build()));

            // Tạo role USER nếu chưa tồn tại
            rolesRepository.findByName(RolesCode.USER.toString())
                    .orElseGet(() -> rolesRepository.save(Roles.builder()
                            .name(RolesCode.USER.toString())
                            .description("User Role")
                            .build()));
            Roles adminRole = Roles.builder()
                    .name(RolesCode.ADMIN.toString())
                    .description("Admin Role")
                    .build();
            // Tạo user admin nếu chưa có
            if (usersRepository.findByUsername("admin").isEmpty()) {
                var roles = new HashSet<Roles>();
                roles.add(adminRole);
                Users admin = Users.builder()
                        .username("admin")
                        .password(passwordEncoder.encode("admin123"))
                        .name("admin")
                        .email("admin@admin.com")
                        .gender("Male")
                        .language(LanguageCode.ENGLISH.getName())
                        .status(StatusUser.ACTIVE.toString())
                        .roles(roles)
                        .build();
                usersRepository.save(admin);
            } else {
                System.out.println("Admin user already exists");
            }
        };
    }


    @Bean
    ApplicationRunner initLanguages() {
        return args -> {
            for (LanguageCode code : LanguageCode.values()) {
                languageRepository.findByName(code.getName()).orElseGet(() ->
                        languageRepository.save(new Language(code.getName(), code.getName()))
                );
            }
        };
    }
}
