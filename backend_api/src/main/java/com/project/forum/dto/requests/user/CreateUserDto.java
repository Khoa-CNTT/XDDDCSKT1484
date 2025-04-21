package com.project.forum.dto.requests.user;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Builder
@Getter
@Setter
@FieldDefaults(level = AccessLevel.PRIVATE)
@AllArgsConstructor
@NoArgsConstructor
public class CreateUserDto {
    @NotEmpty
    String name;
    @NotEmpty
    String language;
    @NotEmpty
    String gender;

    String img;
    @Email
    String email;
    @NotEmpty
    String username;
    @NotEmpty
    String password;
    @NotEmpty
    String re_password;
}
