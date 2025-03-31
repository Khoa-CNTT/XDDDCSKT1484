package com.project.forum.dto.responses.post;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.project.forum.enums.TypePost;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@JsonInclude(JsonInclude.Include.NON_NULL)
@FieldDefaults(level = AccessLevel.PRIVATE)
public class PostResponse {

    String id;

    String type_post;

    LocalDateTime created_at;

    LocalDateTime updated_at;

    String user_name;

    String user_avatar;

    String user_id;

    String language;

    boolean user_post;

    boolean user_like;

    Long like;

    Long comment;

    boolean isShow;


}
