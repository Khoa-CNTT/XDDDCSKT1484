package com.project.forum.dto.requests.transaction;

import com.project.forum.enity.Users;
import com.project.forum.enums.StatusPayment;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;
import org.springframework.data.annotation.CreatedDate;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Builder
@Getter
@Setter
@FieldDefaults(level = AccessLevel.PRIVATE)
@AllArgsConstructor
@NoArgsConstructor
public class TransactionDto {

    @NotNull
    BigDecimal amount;

    @NotEmpty
    String currency;

    @NotEmpty
    String message;

    @NotNull
    LocalDateTime created_at;

    @NotEmpty
    String status;

    @NotEmpty
    String payment_method;

    @NotEmpty
    String transaction_id;

    @NotEmpty
    String payable_id;

    @NotEmpty
    String payable_type;

    @NotEmpty
    String userId;

}
