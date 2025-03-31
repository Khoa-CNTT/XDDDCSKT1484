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
@Entity(name = "friend_ship")
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
