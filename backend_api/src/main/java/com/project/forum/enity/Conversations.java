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
@Table(name = "conversations", indexes = {
        @Index(name = "idx_conversations_created_at", columnList = "created_at")
})
@EntityListeners(AuditingEntityListener.class)
public class Conversations {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    String id;

    @CreatedDate()
    @Column(updatable = false)
    LocalDateTime created_at;

    @ManyToMany
    @JoinTable(
            name = "conversation_participants",
            joinColumns = @JoinColumn(name = "conversation_id"),
            inverseJoinColumns = @JoinColumn(name = "user_id")
    )
    List<Users> participants;

    @OneToMany(mappedBy = "conversations")
    List<Messages> messages;
}
