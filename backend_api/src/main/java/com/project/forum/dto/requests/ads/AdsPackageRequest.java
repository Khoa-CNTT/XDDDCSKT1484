package com.project.forum.dto.requests.ads;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Builder
@Getter
@Setter
@FieldDefaults(level = AccessLevel.PRIVATE)
@AllArgsConstructor
@NoArgsConstructor
public class AdsPackageRequest {

    String name;

    String description;

    BigDecimal price;

    int max_impressions;

}