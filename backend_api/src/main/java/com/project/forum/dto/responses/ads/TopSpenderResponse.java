package com.project.forum.dto.responses.ads;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class TopSpenderResponse {
    private String userId;
    private String username;
    private String name;
    private String email;
    private BigDecimal totalSpent;
    private String currency;
} 