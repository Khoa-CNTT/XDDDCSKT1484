package com.project.forum.enity;

import com.fasterxml.jackson.annotation.JsonInclude;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

@Builder
@Getter
@Setter
@AllArgsConstructor
@ToString
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@JsonInclude(JsonInclude.Include.NON_NULL)
@Entity
@Table(name = "post_content", indexes = {
        @Index(name = "idx_post_content_post_id", columnList = "post_id")
})

@EntityListeners(AuditingEntityListener.class)
public class PostContent {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    String id;

    String title;

    @Column(length = 5000)
    String content;

    String img_url;

    @OneToOne
    @JoinColumn(name = "post_id")
    Posts posts;

}
