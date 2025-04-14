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
@Table(name = "comment_reply", indexes = {
        @Index(name = "idx_comment_reply_created_at", columnList = "created_at"),
        @Index(name = "idx_comment_reply_user_id", columnList = "user_id"),
        @Index(name = "idx_comment_reply_comment_id", columnList = "comment_id")
})
@EntityListeners(AuditingEntityListener.class)
public class CommentReply {

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
    @JoinColumn(name = "comment_id")
    Comments comments;



}
