package com.project.forum.dto.requests.transaction;

import com.project.forum.enity.Users;
import com.project.forum.enums.StatusPayment;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;
import org.springframework.data.annotation.CreatedDate;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Builder
@Getter
@Setter
@FieldDefaults(level = AccessLevel.PRIVATE)
@AllArgsConstructor
@NoArgsConstructor
public class TransactionDto {


    BigDecimal amount;

    String currency;

    String message;

    LocalDateTime created_at;

    String status;

    String payment_method;

    String transaction_id;

    String payable_id;

    String payable_type;

    String userId;


}
