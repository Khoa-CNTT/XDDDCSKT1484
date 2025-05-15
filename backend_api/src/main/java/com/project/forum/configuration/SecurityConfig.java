package com.project.forum.configuration;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationConverter;
import org.springframework.security.oauth2.server.resource.authentication.JwtGrantedAuthoritiesConverter;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@EnableWebSecurity
@Configuration
@EnableMethodSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    final JwtDecoderCustom jwtDecoderCustom;


    // Public endpoints
   private static final String[] PUBLIC_GET = {
            "/ads-package", "/ads-package/*", "/comment-reply", "/comments", "/mail/active", "/mail/send-mail/active", "/post-content/*","/posts","/posts/*",
            "/posts/user/*","/post-poll/*" ,"/users", "/users/*", "/users/find", "/vn-pay/submitOrder", "/vn-pay/orderReturn",
    };
    private static final String[] PUBLIC_POST = {
            "/ai", "/ai/translate", "/auth/**", "/mail/send-mail/change-password",
    };

    // User endpoints
    private static final String[] USER_GET = {
            "/ads/user", "/ads/*", "/friend-ship/*","/friend-ship/friendship" ,"friend-ship/friendship-request", "/notices", "/notices/read", "/post-content-history/*",
            "/posts/user", "/transaction/user", "/transaction/*","/transaction/*/ads", "/users/my-info"
    };
    private static final String[] USER_POST = {
            "/comments", "/comment-reply", "/friend-ship" , "/friend-ship/accept/*","friend-ship/reject/*", "/friend-ship/un-accept/*","/poll-vote/vote/*"
            ,"/poll-vote/vote/multiple", "/likes/action", "/post-content", "/post-poll", "/upload/image"

    };
    private static final String[] USER_PUT = {"/notices/read"};
    private static final String[] USER_DELETE = {
            "/comments/*", "/comment-reply/*","/posts/*","/upload/image"
    };
    private static final String[] USER_PATCH = {"/post-content/*","/posts/*/Show","/users"};

    // Admin endpoints
    private static final String[] ADMIN_GET = {
            "/ads", "/posts/find", "/reports", "/transaction"
    };
    private static final String[] ADMIN_POST = {
            "/ads-package"
    };
    private static final String[] ADMIN_PUT = {
            "/ads-package/*", "/users/*/status"
    };
    private static final String[] ADMIN_DELETE = {
            "/ads-package/*","/reports/*"
    };
    private static final String[] ADMIN_PATCH = {"/posts/*/status", "/reports/*"};

    @Bean
    SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http    .cors(Customizer.withDefaults())
                .authorizeHttpRequests(requests -> requests
                // Public
                .requestMatchers("/swagger-ui/**", "/v3/api-docs/**","/ws/**", "/user/**", "/topic/**").permitAll()
                .requestMatchers(HttpMethod.GET, PUBLIC_GET).permitAll()
                .requestMatchers(HttpMethod.POST, PUBLIC_POST).permitAll()

                // User
                .requestMatchers(HttpMethod.GET, USER_GET).hasAnyRole("USER", "ADMIN")
                .requestMatchers(HttpMethod.POST, USER_POST).hasAnyRole("USER", "ADMIN")
                .requestMatchers(HttpMethod.PUT, USER_PUT).hasAnyRole("USER", "ADMIN")
                .requestMatchers(HttpMethod.DELETE, USER_DELETE).hasAnyRole("USER", "ADMIN")
                .requestMatchers(HttpMethod.PATCH, USER_PATCH).hasAnyRole("USER", "ADMIN")


                .requestMatchers(HttpMethod.GET, ADMIN_GET).hasRole("ADMIN")
                .requestMatchers(HttpMethod.POST, ADMIN_POST).hasRole("ADMIN")
                .requestMatchers(HttpMethod.PUT, ADMIN_PUT).hasRole("ADMIN")
                .requestMatchers(HttpMethod.DELETE, ADMIN_DELETE).hasRole("ADMIN")
                .requestMatchers(HttpMethod.PATCH, ADMIN_PATCH).hasRole("ADMIN")


                .anyRequest().authenticated()
        );

        http.oauth2ResourceServer(oauth2 ->
                oauth2.jwt(jwt ->
                        jwt.decoder(jwtDecoderCustom)
                                .jwtAuthenticationConverter(jwtAuthenticationConverter())
                ).authenticationEntryPoint(new JwtAuthEntryPoint())
        );

        http.csrf(csrf -> csrf.disable());
        http.headers(headers -> headers.frameOptions(frame -> frame.disable()));

        return http.build();
    }

    @Bean
    JwtAuthenticationConverter jwtAuthenticationConverter() {
        JwtGrantedAuthoritiesConverter converter = new JwtGrantedAuthoritiesConverter();
        converter.setAuthorityPrefix("ROLE_");
        JwtAuthenticationConverter jwtAuthConverter = new JwtAuthenticationConverter();
        jwtAuthConverter.setJwtGrantedAuthoritiesConverter(converter);
        return jwtAuthConverter;
    }

    @Bean
    WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**")
                        .allowedOrigins("http://localhost:1407", "http://127.0.0.1:5500")
                        .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH")
                        .allowedHeaders("*")
                        .allowCredentials(true);
            }
        };
    }
}
