package com.project.forum.dto.requests.user;

import lombok.*;
import lombok.experimental.FieldDefaults;
import jakarta.validation.constraints.NotEmpty;

@Builder
@Getter
@Setter
@FieldDefaults(level = AccessLevel.PRIVATE)
@AllArgsConstructor
@NoArgsConstructor
public class UpdatePasswordDto {
    @NotEmpty
    String password;

    @NotEmpty
    String rePassword;
}

