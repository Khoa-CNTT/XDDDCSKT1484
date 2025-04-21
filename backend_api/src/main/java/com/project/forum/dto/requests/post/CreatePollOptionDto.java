package com.project.forum.dto.requests.post;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.project.forum.validation.OptionalRange;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Builder
@Getter
@Setter
@FieldDefaults(level = AccessLevel.PRIVATE)
@AllArgsConstructor
@NoArgsConstructor
public class CreatePollOptionDto {

    @NotEmpty
    @OptionalRange(min = 1, max = 100)
    String option;

}
