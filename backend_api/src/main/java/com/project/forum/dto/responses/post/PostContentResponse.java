package com.project.forum.dto.responses.post;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.project.forum.enity.Posts;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@JsonInclude(JsonInclude.Include.NON_NULL)
@FieldDefaults(level = AccessLevel.PRIVATE)
public class PostContentResponse {

    String id;

    String title;

    String content;

    String img_url;

    String postId;
}
