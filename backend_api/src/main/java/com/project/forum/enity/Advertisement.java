package com.project.forum.enity;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.project.forum.enums.StatusAds;
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
@Table(name = "advertisement", indexes = {
        @Index(name = "idx_advertisement_status", columnList = "status"),
        @Index(name = "idx_advertisement_created_at", columnList = "created_at"),
        @Index(name = "idx_advertisement_post_id", columnList = "post_id"),
        @Index(name = "idx_advertisement_ads_package_id", columnList = "ads_package_id")
})

@EntityListeners(AuditingEntityListener.class)
public class Advertisement {

    @Id
    String id;

    int views;

    boolean status;

    @CreatedDate
    @Column(updatable = false)
    LocalDateTime created_at;

    @ManyToOne
    @JoinColumn(name = "post_id")
    Posts posts;

    @ManyToOne(optional = true)
    @JoinColumn(name = "ads_package_id")
    AdsPackage adsPackage;

}
