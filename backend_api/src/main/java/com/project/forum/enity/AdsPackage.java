package com.project.forum.enity;

import com.fasterxml.jackson.annotation.JsonInclude;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.math.BigDecimal;
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
@Table(name = "ads_package", indexes = {
        @Index(name = "idx_ads_package_name", columnList = "name"),
        @Index(name = "idx_ads_package_price", columnList = "price"),
        @Index(name = "idx_ads_package_created", columnList = "created")
})
@EntityListeners(AuditingEntityListener.class)
public class AdsPackage {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    String id;

    String name;

    String description;

    BigDecimal price;

    int max_impressions;

    @CreatedDate
    @Column(updatable = false)
    LocalDateTime created;

    @OneToMany(mappedBy = "adsPackage")
    List<Advertisement> advertisements;
}
