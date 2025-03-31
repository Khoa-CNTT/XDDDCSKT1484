package com.project.forum.dto.responses.user;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@JsonInclude(JsonInclude.Include.NON_NULL)
@FieldDefaults(level = AccessLevel.PRIVATE)
public class UserFriendResponse {
    String id;

    String name;

    String language;

    String gender;

    String img;

    String email;

    String username;

    long count;
}
