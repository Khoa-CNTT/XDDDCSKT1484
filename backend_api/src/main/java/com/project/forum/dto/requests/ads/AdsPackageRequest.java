package com.project.forum.dto.requests.ads;

import com.project.forum.validation.OptionalRange;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
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

    @NotNull
    @OptionalRange(min = 10, max = 200)
    String name;

    @NotNull
    @OptionalRange(min = 10, max = 200)
    String description;

    @NotNull
    @Min(1)
    BigDecimal price;

    @NotNull
    @Min(1)
    int max_impressions;

}