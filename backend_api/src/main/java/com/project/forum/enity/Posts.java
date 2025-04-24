package com.project.forum.enity;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.project.forum.enums.TypePost;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;
import org.hibernate.annotations.UpdateTimestamp;
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
@Table(name = "posts", indexes = {
        @Index(name = "idx_posts_user_id", columnList = "user_id"),
        @Index(name = "idx_posts_language_id", columnList = "language_id")
})

@EntityListeners(AuditingEntityListener.class)
public class Posts {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    String id;

    String type_post;

    @CreatedDate
    @Column(updatable = false)
    LocalDateTime created_at;

    @UpdateTimestamp
    LocalDateTime updated_at;


    @ManyToOne
    @JoinColumn(name = "user_id")
    Users users;

    boolean postShow;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "language_id")
    Language language;


    @OneToMany(mappedBy = "posts",orphanRemoval = true)
    List<Likes> likes;

    @OneToMany(mappedBy = "posts",orphanRemoval = true)
    List<Comments> comments;

    @OneToMany(mappedBy = "posts",orphanRemoval = true)
    List<Advertisement> advertisements;

    @OneToMany(mappedBy = "posts",orphanRemoval = true)
    List<PostContentHistory> postContentHistories;

    @OneToOne(mappedBy = "posts",orphanRemoval = true)
    private PostPoll postPoll;

    @OneToOne(mappedBy = "posts",orphanRemoval = true)
    private PostContent postContent;

    @OneToOne(mappedBy = "posts",orphanRemoval = true)
    private PostReports postReports;
}
