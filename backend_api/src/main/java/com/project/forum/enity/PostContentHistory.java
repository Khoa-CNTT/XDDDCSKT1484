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
@Table(name = "postContentHistory", indexes = {
        @Index(name = "idx_post_content_history_post_id", columnList = "post_id"),
        @Index(name = "idx_post_content_history_created_at", columnList = "created_at")
})
@EntityListeners(AuditingEntityListener.class)
public class PostContentHistory {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    String id;

    String title;

    String content;

    @CreatedDate
    @Column(updatable = false)
    LocalDateTime created_at;

    @ManyToOne
    @JoinColumn(name = "post_id")
    Posts posts;

}
