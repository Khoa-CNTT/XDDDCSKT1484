package com.project.forum.enity;

import com.fasterxml.jackson.annotation.JsonInclude;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;

@Builder
@Getter
@Setter
@AllArgsConstructor
@ToString
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@JsonInclude(JsonInclude.Include.NON_NULL)
@Entity
@Table(name = "likes", indexes = {
        @Index(name = "idx_likes_user_id", columnList = "user_id"),
        @Index(name = "idx_likes_post_id", columnList = "post_id"),
        @Index(name = "idx_likes_created_at", columnList = "created_at")
})

@EntityListeners(AuditingEntityListener.class)
public class Likes {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    String id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    Users users;

    @ManyToOne
    @JoinColumn(name = "post_id")
    Posts posts;

    @CreatedDate()
    LocalDateTime created_at;
}
