package com.project.forum.dto.requests.post;

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
public class UpdatePostContentDto {
    @NotEmpty()
    @OptionalRange(min = 1, max = 1000)
    String content;
    @NotEmpty()
    @OptionalRange(min = 1, max = 100)
    String title;
}
