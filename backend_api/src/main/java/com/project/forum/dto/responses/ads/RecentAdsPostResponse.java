package com.project.forum.dto.responses.ads;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class RecentAdsPostResponse {
    private String type_post;
    private String language;
    private LocalDateTime created_at;
    private String title;
    private LocalDateTime ads_created_at;
} 