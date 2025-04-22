package com.project.forum.dto.requests.vote;

import lombok.*;
import lombok.experimental.FieldDefaults;
import jakarta.validation.constraints.NotEmpty;

import java.util.List;

@Builder
@Getter
@Setter
@FieldDefaults(level = AccessLevel.PRIVATE)
@AllArgsConstructor
@NoArgsConstructor
public class CreateVoteMultipleDto {

    @NotEmpty
    List<String> pollOptionId;

}

