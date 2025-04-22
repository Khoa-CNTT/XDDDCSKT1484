package com.project.forum.dto.requests.post;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.project.forum.enity.Language;
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
public class CreatePostContentDto {
    @NotEmpty
    @OptionalRange(min = 1, max = 100)
    String title;
    @NotEmpty
    @OptionalRange(min = 1, max = 1000)
    String content;
    @NotEmpty
    @OptionalRange(min = 1, max = 1000)
    String img_url;
    @NotEmpty
    String language;
}
