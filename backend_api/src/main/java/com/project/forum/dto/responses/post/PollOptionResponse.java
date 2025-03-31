package com.project.forum.dto.responses.post;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@JsonInclude(JsonInclude.Include.NON_NULL)
@FieldDefaults(level = AccessLevel.PRIVATE)
public class PollOptionResponse {

    String id;
    String optionText;
    Long voteCount;
    Boolean isSelected;
    LocalDateTime created_at;

}
