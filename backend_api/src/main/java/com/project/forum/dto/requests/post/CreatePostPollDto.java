package com.project.forum.dto.requests.post;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.project.forum.enums.TypePoll;
import com.project.forum.validation.OptionalRange;
import jakarta.validation.constraints.NotEmpty;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.List;

@Builder
@Getter
@Setter
@FieldDefaults(level = AccessLevel.PRIVATE)
@AllArgsConstructor
@NoArgsConstructor
public class CreatePostPollDto {
    @NotEmpty()
    @OptionalRange(min = 1, max = 1000)
    String question;
    @NotEmpty()
    TypePoll typePoll;
    @NotEmpty()
    String language;
    @NotEmpty()
    List<CreateOptionDto> createOptionDtoList;
}
