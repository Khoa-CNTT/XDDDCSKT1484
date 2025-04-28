package com.project.forum.dto.responses.transaction;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class TransactionTotalResponse {
    private BigDecimal totalAmount;
    private String currency;
} 