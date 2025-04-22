package com.project.forum.dto.requests.user;

import com.project.forum.validation.OptionalRange;
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
    @OptionalRange(min = 2, max = 30)
    String name;
    @NotEmpty
    String language;
    @NotEmpty
    String gender;

    String img;
    @Email
    String email;
    @NotEmpty
    @OptionalRange(min = 5, max = 30)
    String username;
    @NotEmpty
    @OptionalRange(min = 5, max = 30)
    String password;
    @NotEmpty
    @OptionalRange(min = 5, max = 30)
    String re_password;
}
