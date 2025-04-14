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
@Table(name = "messages", indexes = {
        @Index(name = "idx_messages_conversation_id", columnList = "conversation_id"),
        @Index(name = "idx_messages_sender_id", columnList = "sender_id"),
        @Index(name = "idx_messages_created_at", columnList = "created_at"),
        @Index(name = "idx_messages_is_read", columnList = "is_read")
})

@EntityListeners(AuditingEntityListener.class)
public class Messages {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    String id;

    @ManyToOne
    @JoinColumn(name = "conversation_id", nullable = false)
    Conversations conversations;

    @ManyToOne
    @JoinColumn(name = "sender_id", nullable = false)
    Users sender;

    @Column(nullable = false)
    String content;

    @CreatedDate
    @Column(updatable = false)
    LocalDateTime created_at;

    @Column(nullable = false)
    Boolean is_read = false;

}
