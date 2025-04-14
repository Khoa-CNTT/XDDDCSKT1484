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
@Table(name = "friend_ship", indexes = {
        @Index(name = "idx_friend_ship_created_at", columnList = "created_at"),
        @Index(name = "idx_friend_ship_sender_id", columnList = "sender_id"),
        @Index(name = "idx_friend_ship_receiver_id", columnList = "receiver_id")
})
@EntityListeners(AuditingEntityListener.class)
public class FriendShip {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    String id;

    @CreatedDate()
    @Column(updatable = false)
    LocalDateTime created_at;

    String status;

    @ManyToOne
    @JoinColumn(name = "sender_id")
    Users sender;

    @ManyToOne
    @JoinColumn(name = "receiver_id")
    Users receiver;
}
