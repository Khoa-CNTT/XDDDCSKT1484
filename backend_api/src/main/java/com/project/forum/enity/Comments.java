package com.project.forum.enity;

import com.fasterxml.jackson.annotation.JsonInclude;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;
import java.util.List;

@Builder
@Getter
@Setter
@AllArgsConstructor
@ToString
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@JsonInclude(JsonInclude.Include.NON_NULL)
@Entity
@Table(name = "comments", indexes = {
        @Index(name = "idx_comments_created_at", columnList = "created_at"),
        @Index(name = "idx_comments_user_id", columnList = "user_id"),
        @Index(name = "idx_comments_post_id", columnList = "post_id")
})
@EntityListeners(AuditingEntityListener.class)
public class Comments {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    String id;

    String content;

    @CreatedDate()
    @Column(updatable = false)
    LocalDateTime created_at;

    @ManyToOne
    @JoinColumn(name = "user_id")
    Users users;

    @ManyToOne
    @JoinColumn(name = "post_id")
    Posts posts;

    @OneToMany(mappedBy = "comments",cascade = CascadeType.REMOVE)
    List<CommentReply> commentReplies;
}
