package com.project.forum.dto.responses.post;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.project.forum.enity.Posts;
import jakarta.persistence.Column;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import lombok.*;
import lombok.experimental.FieldDefaults;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@JsonInclude(JsonInclude.Include.NON_NULL)
@FieldDefaults(level = AccessLevel.PRIVATE)
public class PostRepostResponse {

    String id;

    String reason;

    LocalDateTime createdAt;

    String postId;

    String typePost;

    boolean status;
}
