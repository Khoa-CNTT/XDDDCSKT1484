package com.project.forum.dto.requests.user;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.project.forum.validation.OptionalRange;
import jakarta.validation.constraints.NotEmpty;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Builder
@Getter
@Setter
@FieldDefaults(level = AccessLevel.PRIVATE)
@AllArgsConstructor
@NoArgsConstructor
public class UpdateUserDto {
    @OptionalRange(min = 5, max = 30)
    String name;


    String language;


    String gender;

    @OptionalRange(min = 1, max = 1000)
    String img;
}
