package com.project.forum.dto.responses.transaction;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.project.forum.enity.Users;
import com.project.forum.enums.StatusPayment;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;
import org.springframework.data.annotation.CreatedDate;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@JsonInclude(JsonInclude.Include.NON_NULL)
@FieldDefaults(level = AccessLevel.PRIVATE)
public class TransactionResponse {

    String id;

    BigDecimal amount;

    String currency;

    String message;

    LocalDateTime created_at;

    String status;

    String payment_method;

    String transaction_id;

    String payable_id;

    String payable_type;

    String url_payment;

    String userId;

    String name;
}
