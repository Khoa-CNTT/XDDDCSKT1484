package com.project.forum.service;

import com.project.forum.dto.requests.transaction.TransactionDto;
import com.project.forum.dto.responses.transaction.TransactionResponse;
import com.project.forum.dto.responses.transaction.TransactionTotalResponse;
import com.project.forum.dto.responses.transaction.MonthlyRevenueResponse;
import com.project.forum.dto.responses.transaction.TopAmountPostResponse;
import org.springframework.data.domain.Page;

import java.time.LocalDateTime;
import java.util.List;

public interface ITransactionService {

    Page<TransactionResponse> getAllTransactions(Integer page, Integer limit );

    Page<TransactionResponse> getTransactionUser(Integer page, Integer limit);

    TransactionResponse create(TransactionDto transactionDto);

    TransactionResponse update(String status);

    boolean delete(String id);

    TransactionResponse getTransaction(String id);

    TransactionTotalResponse getTotalRevenue();

    MonthlyRevenueResponse getMonthlyRevenue(Integer year);

    TransactionResponse getTransactionByPayable_Id(String id);

    List<TopAmountPostResponse> getTopPostsByAmount(LocalDateTime from, LocalDateTime to, Integer limit);
}
