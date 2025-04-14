package com.project.forum.service.implement;

import com.project.forum.dto.requests.transaction.TransactionDto;
import com.project.forum.dto.responses.transaction.TransactionResponse;
import com.project.forum.enity.Transaction;
import com.project.forum.enity.Users;
import com.project.forum.enums.ErrorCode;
import com.project.forum.exception.WebException;
import com.project.forum.mapper.TransactionMapper;
import com.project.forum.repository.TransactionRepository;
import com.project.forum.repository.UsersRepository;
import com.project.forum.service.ITransactionService;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class TransactionService implements ITransactionService {

    TransactionRepository transactionRepository;

    UsersRepository usersRepository;

    TransactionMapper transactionMapper;

    @Override
    public Page<TransactionResponse> getAllTransactions(Integer page, Integer limit) {
        Pageable pageable = PageRequest.of(page, limit);
        Page<TransactionResponse> transactionResponses = transactionRepository.getAllTransactions(pageable);
        return transactionResponses;
    }

    @Override
    public Page<TransactionResponse> getTransactionUser(Integer page, Integer limit) {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        Users users =  usersRepository.findByUsername(username).orElseThrow(() -> new WebException(ErrorCode.E_USER_NOT_FOUND));
        Pageable pageable = PageRequest.of(page, limit);
        Page<TransactionResponse> transactionResponses = transactionRepository.getAllTransactionsUsers(users.getId(), pageable);

        return transactionResponses;
    }

    @Override
    public TransactionResponse create(TransactionDto transactionDto) {
        Transaction transaction = transactionMapper.toTransaction(transactionDto);
        Users users = usersRepository.findById(transactionDto.getUserId()).orElseThrow(() -> new WebException(ErrorCode.E_USER_NOT_FOUND));
        transaction.setUsers(users);
        transactionRepository.save(transaction);

        TransactionResponse transactionResponse = transactionMapper.toTransactionResponse(transaction);
        transactionResponse.setUserId(users.getId());
        transactionResponse.setName(users.getUsername());
        return transactionResponse;
    }

    @Override
    public TransactionResponse update(String status) {
        return null;
    }

    @Override
    public boolean delete(String id) {
        return false;
    }

    @Override
    public TransactionResponse getTransaction(String id) {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        Users users = usersRepository.findByUsername(username).orElseThrow(() -> new WebException(ErrorCode.E_USER_NOT_FOUND));
        TransactionResponse transactionResponse = transactionRepository.getTransactionById(id,users.getId()).orElseThrow(() -> new WebException(ErrorCode.E_TRANSACTION_NOT_FOUND));



        return transactionResponse;
    }
}
