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
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.ApplicationRunner;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.Collections;
import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

@Configuration
@RequiredArgsConstructor
public class StartUpRunner {

    private final UsersRepository usersRepository;
    private final PasswordEncoder passwordEncoder;
    private final RolesRepository rolesRepository;
    private final LanguageRepository languageRepository;
    @Bean
    ApplicationRunner createRoles() {
        return args -> {
            Optional<Roles> adminRole = rolesRepository.findByName(RolesCode.ADMIN.toString());
            Optional<Roles> employeeRole = rolesRepository.findByName(RolesCode.EMPLOYEE.toString());
            Optional<Roles> userRole = rolesRepository.findByName(RolesCode.USER.toString());

            if (adminRole.isEmpty()) {
                Roles roles = Roles.builder()
                        .name(RolesCode.ADMIN.toString())
                        .description("Admin Role")
                        .build();
                rolesRepository.save(roles);
            }

            if (employeeRole.isEmpty()) {
                Roles roles = Roles.builder()
                        .name(RolesCode.EMPLOYEE.toString())
                        .description("Employee Role")
                        .build();
                rolesRepository.save(roles);
            }

            if (userRole.isEmpty()) {
                Roles roles = Roles.builder()
                        .name(RolesCode.USER.toString())
                        .description("User Role")
                        .build();
                rolesRepository.save(roles);
            }
        };
    }


//
//    Roles adminRoleValue = adminRole.orElseThrow(() -> new WebException(ErrorCode.E_ROLE_NOT_FOUND));
//    Roles userRoleValue = userRole.orElseThrow(() -> new WebException(ErrorCode.E_ROLE_NOT_FOUND));
//    Roles employeeRoleValue = employeeRole.orElseThrow(() -> new WebException(ErrorCode.E_ROLE_NOT_FOUND));
//
//    Set<Roles> roleSet = new HashSet<>();
//                roleSet.add(adminRoleValue);
//                roleSet.add(userRoleValue);
//                roleSet.add(employeeRoleValue);
    @Bean
    ApplicationRunner createAdminUser() {
        return args -> {
            if (usersRepository.findByUsername("admin").isEmpty()) {
                Roles adminRole = rolesRepository.findByName(RolesCode.ADMIN.toString()).orElseThrow(() -> new WebException(ErrorCode.E_ROLE_NOT_FOUND));
                Roles userRole = rolesRepository.findByName(RolesCode.USER.toString()).orElseThrow(() -> new WebException(ErrorCode.E_ROLE_NOT_FOUND));
                Roles employeeRole = rolesRepository.findByName(RolesCode.EMPLOYEE.toString()).orElseThrow(() -> new WebException(ErrorCode.E_ROLE_NOT_FOUND));
                // Tạo user admin
//                Set<Roles> set = new HashSet<>();
//                set.add(role.get());
                Users admin = Users.builder()
                        .username("admin")
                        .password(passwordEncoder.encode("admin123"))
//                        .roles(Collections.singleton(adminRole))
                        .name("admin")
                        .email("admin@admin.com")
                        .gender("Male")
                        .language("English")
                        .status(StatusUser.ACTIVE.toString())
                        .build();

                usersRepository.save(admin);
            } else {
                System.out.println("Admin user already exists");
            }
        };
    }


    @Bean
    ApplicationRunner createLanguage() {
        return args -> {
        if (languageRepository.findByName(LanguageCode.ENGLISH.getName()).isEmpty()) {
            languageRepository.save(new Language(LanguageCode.ENGLISH.getName(),LanguageCode.ENGLISH.getName()));
        }
        if (languageRepository.findByName(LanguageCode.CHINA.getName()).isEmpty()){
            languageRepository.save(new Language(LanguageCode.CHINA.getName(),LanguageCode.CHINA.getName()));
        }
        if (languageRepository.findByName(LanguageCode.JAPAN.getName()).isEmpty()){
            languageRepository.save(new Language(LanguageCode.JAPAN.getName(),LanguageCode.JAPAN.getName()));
        }
        };
    }
}
