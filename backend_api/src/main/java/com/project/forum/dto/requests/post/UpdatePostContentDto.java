package com.project.forum.dto.requests.post;

import jakarta.validation.constraints.NotEmpty;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Builder
@Getter
@Setter
@FieldDefaults(level = AccessLevel.PRIVATE)
@AllArgsConstructor
@NoArgsConstructor
public class UpdatePostContentDto {
    @NotEmpty()
    String content;
    @NotEmpty()
    String title;
}
