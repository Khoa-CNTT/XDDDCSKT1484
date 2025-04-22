package com.project.forum.dto.requests.user;

import com.project.forum.validation.OptionalRange;
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
    @OptionalRange(min = 5, max = 30)
    String password;

    @NotEmpty
    @OptionalRange(min = 5, max = 30)
    String rePassword;
}

