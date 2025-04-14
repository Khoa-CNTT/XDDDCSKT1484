package com.project.forum.service;

import com.project.forum.dto.requests.transaction.TransactionDto;
import com.project.forum.dto.responses.transaction.TransactionResponse;
import org.springframework.data.domain.Page;

public interface ITransactionService {

    Page<TransactionResponse> getAllTransactions(Integer page, Integer limit );

    Page<TransactionResponse> getTransactionUser(Integer page, Integer limit);

    TransactionResponse create(TransactionDto transactionDto);

    TransactionResponse update(String status);

    boolean delete(String id);

    TransactionResponse getTransaction(String id);

}
