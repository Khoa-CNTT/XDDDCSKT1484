package com.project.forum.dto.responses.user;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.project.forum.enity.Roles;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.Set;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@JsonInclude(JsonInclude.Include.NON_NULL)
@FieldDefaults(level = AccessLevel.PRIVATE)
public class UserResponse {

    String id;

    String name;

    String language;

    String gender;

    String img;

    String email;

    String username;

    String roles;

    String active;

}
