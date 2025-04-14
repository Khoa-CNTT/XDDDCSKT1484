package com.project.forum.enity;


import com.fasterxml.jackson.annotation.JsonInclude;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;

@Builder
@Getter
@Setter
@AllArgsConstructor
@ToString
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@JsonInclude(JsonInclude.Include.NON_NULL)
@Entity
@Table(name = "users", indexes = {
        @Index(name = "idx_users_username", columnList = "username"),
        @Index(name = "idx_users_status", columnList = "status"),
        @Index(name = "idx_users_name", columnList = "name"),
        @Index(name = "idx_users_id", columnList = "id")
})
@EntityListeners(AuditingEntityListener.class)
public class Users {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    String id;

    String name;

    String language;

    String gender;

    String img;

    String email;

    String username;

    String password;

    String status;

    @CreatedDate
    @Column(updatable = false)
    LocalDateTime created;

    @ManyToMany(fetch = FetchType.LAZY, cascade = CascadeType.PERSIST )
    Set<Roles> roles;

    @OneToMany(mappedBy = "users", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    List<Notices> notices;

    @OneToMany(mappedBy = "users", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    List<Posts> posts;

    @OneToMany(mappedBy = "users", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    List<Likes> likes;

    @OneToMany(mappedBy = "users", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    List<Comments> comments;

    @OneToMany(mappedBy = "users", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    List<CommentReply> commentReplies;

    @OneToMany(mappedBy = "users", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    List<PollVote> PollVotes;

    @OneToMany(mappedBy = "users", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    List<Transaction> transactions;

    @ManyToMany(mappedBy = "participants", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    List<Conversations> conversations;

    @OneToMany(mappedBy = "sender", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    List<Messages> messages;

    @OneToMany(mappedBy = "sender", cascade = CascadeType.ALL)
    List<FriendShip> sentFriendShips;

    @OneToMany(mappedBy = "receiver", cascade = CascadeType.ALL)
    List<FriendShip> receivedFriendShips;
}
