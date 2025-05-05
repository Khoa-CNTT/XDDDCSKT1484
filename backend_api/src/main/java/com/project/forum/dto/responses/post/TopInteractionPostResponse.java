package com.project.forum.dto.responses.post;

import com.fasterxml.jackson.annotation.JsonFormat;
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
public class TopInteractionPostResponse {
    String type_post;
    String language;
    
    @JsonFormat(pattern = "yyyy:MM:dd")
    LocalDateTime created_at;
    
    Long total_likes;
    Long total_comments;
    Long total_interactions;
} 