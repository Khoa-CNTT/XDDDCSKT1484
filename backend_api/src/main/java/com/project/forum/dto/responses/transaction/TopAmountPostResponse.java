package com.project.forum.dto.responses.transaction;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class TopAmountPostResponse {
    private String type_post;
    private String language;
    private LocalDateTime created_at;
    private String title;
    private BigDecimal totalAmount;
} 