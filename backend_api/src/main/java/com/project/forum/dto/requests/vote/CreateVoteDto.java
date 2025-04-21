package com.project.forum.dto.requests.vote;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.*;
import lombok.experimental.FieldDefaults;
import jakarta.validation.constraints.NotEmpty;

@Builder
@Getter
@Setter
@FieldDefaults(level = AccessLevel.PRIVATE)
@AllArgsConstructor
@NoArgsConstructor
public class CreateVoteDto {

    @NotEmpty
    String pollOptionId;

}

