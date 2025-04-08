package com.project.forum.dto.responses.post;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.project.forum.enity.Posts;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;
import org.springframework.data.annotation.CreatedDate;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@JsonInclude(JsonInclude.Include.NON_NULL)
@FieldDefaults(level = AccessLevel.PRIVATE)
public class PostContentHistoryResponse {


    String title;

    String content;

    LocalDateTime created_at;


}
