package com.project.forum.dto.requests.ai;

import jakarta.validation.constraints.NotNull;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Builder
@Getter
@Setter
@FieldDefaults(level = AccessLevel.PRIVATE)
@AllArgsConstructor
@NoArgsConstructor
public class TranslateRequest {

    @NotNull
    String text;
    @NotNull
    String language;
}
