package com.project.forum.controller;

import com.project.forum.dto.responses.transaction.TransactionResponse;
import com.project.forum.exception.ApiResponse;
import com.project.forum.service.ITransactionService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@AllArgsConstructor
@RequestMapping("/transaction")
@Tag(name = "15. Transaction")
public class TransactionController {

    ITransactionService transactionService;

    @SecurityRequirement(name = "BearerAuth")
    @GetMapping
    ResponseEntity<ApiResponse<Page<TransactionResponse>>> getALl(@RequestParam(defaultValue = "0") Integer page,
                                                                  @RequestParam(defaultValue = "0") Integer size) {
        return ResponseEntity.ok(ApiResponse.<Page<TransactionResponse>>builder()
                .data(transactionService.getAllTransactions(page, size))
                .build());
    }
    @SecurityRequirement(name = "BearerAuth")
    @GetMapping("/user")
    ResponseEntity<ApiResponse<Page<TransactionResponse>>> getAllByUser(@RequestParam(defaultValue = "0") Integer page,
                                                                        @RequestParam(defaultValue = "0") Integer size) {
        return ResponseEntity.ok(ApiResponse.<Page<TransactionResponse>>builder()
                .data(transactionService.getAllTransactions(page, size))
                .build());
    }

}
