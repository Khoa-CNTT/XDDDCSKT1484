package com.project.forum.enity;

import com.fasterxml.jackson.annotation.JsonInclude;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;
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
@Table(name = "poll_options", indexes = {
        @Index(name = "idx_poll_options_created_at", columnList = "created_at"),
        @Index(name = "idx_poll_options_poll_id", columnList = "poll_id")
})
@EntityListeners(AuditingEntityListener.class)
public class PollOptions {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    String id;

    String option_text;

    LocalDateTime created_at;

    @ManyToOne
    @JoinColumn(name = "poll_id")
    PostPoll postPoll;

    @OneToMany(mappedBy = "poll_options", cascade = CascadeType.REMOVE)
    List<PollVote> pollVotes;
}
