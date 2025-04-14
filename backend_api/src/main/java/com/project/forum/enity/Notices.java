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
@Table(name = "notices", indexes = {
        @Index(name = "idx_notices_created_at", columnList = "created_at"),
        @Index(name = "idx_notices_status", columnList = "status"),
        @Index(name = "idx_notices_post_id", columnList = "post_id"),
        @Index(name = "idx_notices_user_id", columnList = "user_id")
})
@EntityListeners(AuditingEntityListener.class)
public class Notices {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    String id;

    String message;

    @CreatedDate()
    LocalDateTime created_at;

    boolean status;

    String post_id;

    String type;

    @ManyToOne
    @JoinColumn(name = "user_id")
    Users users;
}
