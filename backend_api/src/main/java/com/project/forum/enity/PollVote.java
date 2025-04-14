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
@Table(name = "poll_vote", indexes = {
        @Index(name = "idx_poll_vote_created_at", columnList = "created_at"),
        @Index(name = "idx_poll_vote_poll_options_id", columnList = "poll_options_id"),
        @Index(name = "idx_poll_vote_user_id", columnList = "user_id")
})
@EntityListeners(AuditingEntityListener.class)
public class PollVote {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    String id;

    @CreatedDate()
    @Column(updatable = false)
    LocalDateTime created_at;

    @ManyToOne
    @JoinColumn(name = "poll_options_id")
    PollOptions poll_options;

    @ManyToOne
    @JoinColumn(name = "user_id")
    Users users;
}
