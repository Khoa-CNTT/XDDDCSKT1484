package com.project.forum.repository;

import com.project.forum.dto.responses.transaction.TransactionResponse;
import com.project.forum.dto.responses.transaction.TransactionTotalResponse;
import com.project.forum.dto.responses.transaction.MonthlyRevenueResponse.MonthlyData;
import com.project.forum.dto.responses.ads.TopSpenderResponse;
import com.project.forum.enity.Transaction;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
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

    @Query("SELECT new com.project.forum.dto.responses.transaction.TransactionTotalResponse(" +
            "SUM(t.amount), t.currency) " +
            "FROM Transaction t " +
            "WHERE t.status = 'completed' " +
            "GROUP BY t.currency")
    TransactionTotalResponse getTotalRevenue();

    @Query("SELECT new com.project.forum.dto.responses.transaction.MonthlyRevenueResponse$MonthlyData(" +
            "MONTH(t.created_at), " +
            "COALESCE(SUM(t.amount), 0), " +
            "t.currency) " +
            "FROM Transaction t " +
            "WHERE t.status = 'completed' " +
            "AND YEAR(t.created_at) = :year " +
            "GROUP BY MONTH(t.created_at), t.currency " +
            "ORDER BY MONTH(t.created_at)")
    List<MonthlyData> getMonthlyRevenue(@Param("year") Integer year);

    @Query("SELECT new com.project.forum.dto.responses.ads.TopSpenderResponse(" +
            "t.users.id, " +
            "t.users.username, " +
            "t.users.name, " +
            "t.users.email, " +
            "SUM(t.amount), " +
            "t.currency) " +
            "FROM Transaction t " +
            "WHERE t.status = 'completed' " +
            "AND t.payable_type = 'ADVERTISEMENT' " +
            "GROUP BY t.users.id, t.users.username, t.users.name, t.users.email, t.currency " +
            "ORDER BY SUM(t.amount) DESC")
    List<TopSpenderResponse> getTopSpenders();

    @Query("SELECT new com.project.forum.dto.responses.transaction.TransactionResponse(" +
            "t.id, t.amount, t.currency, t.message, t.created_at, t.status, t.payment_method, " +
            "t.transaction_id, t.payable_id, t.payable_type, t.url_payment ,t.users.id, t.users.name ) " +
            "FROM Transaction t " +
            "WHERE t.payable_id = :id " +
            "AND t.users.id = :userId")
    Optional<TransactionResponse> getTransactionByPayable_id(@Param("id") String id,@Param("userId") String userId);
}