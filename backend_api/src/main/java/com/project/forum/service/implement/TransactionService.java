package com.project.forum.service.implement;

import com.project.forum.dto.requests.transaction.TransactionDto;
import com.project.forum.dto.responses.transaction.TransactionResponse;
import com.project.forum.dto.responses.transaction.TransactionTotalResponse;
import com.project.forum.dto.responses.transaction.MonthlyRevenueResponse;
import com.project.forum.dto.responses.transaction.MonthlyRevenueResponse.MonthlyData;
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

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.time.Year;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.IntStream;

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

    @Override
    public TransactionTotalResponse getTotalRevenue() {
        return transactionRepository.getTotalRevenue();
    }

    @Override
    public MonthlyRevenueResponse getMonthlyRevenue(Integer year) {
        // Nếu không có năm được cung cấp, sử dụng năm hiện tại
        if (year == null) {
            year = Year.now().getValue();
        }

        // Lấy dữ liệu từ repository
        List<MonthlyData> monthlyData = transactionRepository.getMonthlyRevenue(year);

        // Tạo danh sách đầy đủ 12 tháng
        List<MonthlyData> fullYearData = new ArrayList<>();
        IntStream.rangeClosed(1, 12).forEach(month -> {
            // Tìm dữ liệu cho tháng hiện tại
            MonthlyData existingData = monthlyData.stream()
                    .filter(data -> data.getMonth() == month)
                    .findFirst()
                    .orElse(MonthlyData.builder()
                            .month(month)
                            .amount(BigDecimal.ZERO)
                            .currency("VND") // Mặc định là VND nếu không có dữ liệu
                            .build());
            fullYearData.add(existingData);
        });

        return MonthlyRevenueResponse.builder()
                .year(year)
                .monthlyData(fullYearData)
                .build();
    }

    @Override
    public TransactionResponse getTransactionByPayable_Id(String id) {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        Users users = usersRepository.findByUsername(username).orElseThrow(() -> new WebException(ErrorCode.E_USER_NOT_FOUND));
        TransactionResponse transactionResponse = transactionRepository.getTransactionByPayable_id(id,users.getId()).orElseThrow(() -> new WebException(ErrorCode.E_TRANSACTION_NOT_FOUND));

        return transactionResponse;

    }
}
