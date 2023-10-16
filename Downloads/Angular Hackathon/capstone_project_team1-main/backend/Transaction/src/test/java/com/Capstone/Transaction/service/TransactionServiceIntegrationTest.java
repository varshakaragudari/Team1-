package com.Capstone.Transaction.service;

import com.Capstone.Transaction.Transaction;
import com.Capstone.Transaction.repository.TransactionRepository;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.MockitoAnnotations;
import org.mockito.verification.VerificationMode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.mongodb.core.MongoOperations;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.Mockito.*;

@SpringBootTest
public class TransactionServiceIntegrationTest {

    @Autowired
    private TransactionRepository transactionRepository;

    @Autowired
    private TransactionService transactionService;

    private Transaction transaction1, transaction2, transaction3;
    private List<Transaction> transactionList;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.initMocks(this);
        transactionList = new ArrayList<>();
        transaction1 = new Transaction();
        transaction2 = new Transaction();
        transaction3 = new Transaction();
        transactionList.add(transaction1);
        transactionList.add(transaction2);
        transactionList.add(transaction3);
    }

    @AfterEach
    public void tearDown() {
        transactionRepository.deleteAll();
        transaction1 = transaction2 = transaction3 = null;
        transactionList = null;
    }

    @Test
    public void givenTransactionToSaveThenShouldReturnSavedTransaction() {
        Transaction savedTransaction = transactionService.createTransaction(transaction1);
        assertNotNull(savedTransaction);
        assertEquals(transaction1.getTransactionId(), savedTransaction.getTransactionId());
    }


}

