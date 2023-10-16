package com.Capstone.Transaction.service;

import com.Capstone.Transaction.Transaction;
import com.Capstone.Transaction.repository.TransactionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class TransactionService {
    private final TransactionRepository transactionRepository;

    @Autowired
    public TransactionService(TransactionRepository transactionRepository) {
        this.transactionRepository = transactionRepository;
    }

    public List<Transaction> getAllTransactions() {
        return transactionRepository.findAll();
    }

    public Optional<Transaction> getTransactionById(String transactionId) {
        return transactionRepository.findById(transactionId);
    }

    public Transaction createTransaction(Transaction transaction) {
        return transactionRepository.save(transaction);
    }

    public void deleteTransaction(String transactionId) {
        transactionRepository.deleteById(transactionId);
    }
    public List<Transaction> getTransactionsByUserId(String userId) {
        List<Transaction> allTransactions = transactionRepository.findAll();
        // Filter transactions by userId
        return allTransactions.stream()
                .filter(transaction -> userId.equals(transaction.getUserId())) // Adjust the condition as needed
                .collect(Collectors.toList());
    }
    public List<Transaction> getTransactionsByUserIdAndType(String userId, String type) {
        List<Transaction> allTransactions = transactionRepository.findAll();
        // Filter transactions by userId and type
        return allTransactions.stream()
                .filter(transaction -> userId.equals(transaction.getUserId()) && type.equals(transaction.getType())) // Adjust the conditions as needed
                .collect(Collectors.toList());
    }

}

