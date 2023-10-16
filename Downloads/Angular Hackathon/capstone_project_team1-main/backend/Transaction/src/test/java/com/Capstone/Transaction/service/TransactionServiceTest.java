package com.Capstone.Transaction.service;

import com.Capstone.Transaction.Transaction;
import com.Capstone.Transaction.repository.TransactionRepository;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

class TransactionServiceTest {

    @Mock
    private TransactionRepository transactionRepository;

    @InjectMocks
    private TransactionService transactionService;

    private Transaction transaction1, transaction2;
    private List<Transaction> transactionList;
    private Optional<Transaction> optionalTransaction;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.initMocks(this);

        transactionList = new ArrayList<>();
        transaction1 = new Transaction(/* Initialize your transaction properties */);
        transaction2 = new Transaction(/* Initialize your transaction properties */);

        optionalTransaction = Optional.of(transaction1);
    }

    @AfterEach
    public void tearDown() {
        transaction1 = transaction2 = null;
        transactionList = null;
    }

    @Test
    public void givenTransactionToSaveThenShouldReturnSavedTransaction() {
        when(transactionRepository.save(any())).thenReturn(transaction1);
        assertEquals(transaction1, transactionService.createTransaction(transaction1));
        verify(transactionRepository, times(1)).save(any());
    }

    @Test
    public void givenGetAllTransactionsThenShouldReturnListOfAllTransactions() {
        transactionList.add(transaction1);
        transactionList.add(transaction2);
        when(transactionRepository.findAll()).thenReturn(transactionList);

        List<Transaction> retrievedTransactions = transactionService.getAllTransactions();
        assertNotNull(retrievedTransactions);
        assertEquals(2, retrievedTransactions.size());

        verify(transactionRepository, times(1)).findAll();
    }

    @Test
    public void givenTransactionIdThenShouldReturnRespectiveTransaction() {
        when(transactionRepository.findById(any())).thenReturn(optionalTransaction);

        Optional<Transaction> retrievedTransaction = transactionService.getTransactionById("1");
        assertNotNull(retrievedTransaction);

        verify(transactionRepository, times(1)).findById(any());
    }
}

