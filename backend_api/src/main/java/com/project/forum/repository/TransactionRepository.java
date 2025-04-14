package com.project.forum.repository;

import com.project.forum.dto.responses.transaction.TransactionResponse;
import com.project.forum.enity.Transaction;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.Optional;

@Repository
public interface TransactionRepository extends JpaRepository<Transaction, String> {


    @Query("SELECT new com.project.forum.dto.responses.transaction.TransactionResponse(" +
            "t.id, t.amount, t.currency, t.message, t.created_at, t.status, t.payment_method, " +
            "t.transaction_id, t.payable_id, t.payable_type, t.url_payment ,t.users.id, t.users.name ) " +
            "FROM Transaction t")
    Page<TransactionResponse> getAllTransactions(Pageable pageable);


    @Query("SELECT new com.project.forum.dto.responses.transaction.TransactionResponse(" +
            "t.id, t.amount, t.currency, t.message, t.created_at, t.status, t.payment_method, " +
            "t.transaction_id, t.payable_id, t.payable_type, t.url_payment ,t.users.id, t.users.name ) " +
            "FROM Transaction t " +
            "WHERE t.users.id = :id")
    Page<TransactionResponse> getAllTransactionsUsers(@Param("id") String id, Pageable pageable);

    Optional<Transaction> findTransactionByCode(String code);

    @Query("SELECT new com.project.forum.dto.responses.transaction.TransactionResponse(" +
            "t.id, t.amount, t.currency, t.message, t.created_at, t.status, t.payment_method, " +
            "t.transaction_id, t.payable_id, t.payable_type, t.url_payment ,t.users.id, t.users.name ) " +
            "FROM Transaction t " +
            "WHERE t.id = :id " +
            "AND t.users.id = :userId")
    Optional<TransactionResponse> getTransactionById(@Param("id") String id,@Param("userId") String userId);

}