package com.project.forum.mapper;

import com.project.forum.dto.requests.transaction.TransactionDto;
import com.project.forum.dto.responses.transaction.TransactionResponse;
import com.project.forum.enity.Transaction;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface TransactionMapper {

    @Mapping(target = "users", ignore = true)
    Transaction toTransaction(TransactionDto transactionDto);

    @Mapping(target = "name", ignore = true)
    @Mapping(target = "userId", ignore = true)
    TransactionResponse toTransactionResponse(Transaction transaction);
}
