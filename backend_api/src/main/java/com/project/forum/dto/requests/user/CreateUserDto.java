package com.project.forum.dto.requests.user;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Builder
@Getter
@Setter
@FieldDefaults(level = AccessLevel.PRIVATE)
@AllArgsConstructor
@NoArgsConstructor
public class CreateUserDto {

    String name;

    String language;

    String gender;

    String img;

    String email;

    String username;

    String password;

    String re_password;
}
