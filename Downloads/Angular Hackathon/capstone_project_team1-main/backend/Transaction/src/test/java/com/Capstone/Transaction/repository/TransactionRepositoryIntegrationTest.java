package com.Capstone.Transaction.repository;

import com.Capstone.Transaction.Transaction;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.data.mongo.DataMongoTest;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

@DataMongoTest
public class TransactionRepositoryIntegrationTest {

    @Autowired
    private TransactionRepository transactionRepository;
    private Transaction transaction;

    @BeforeEach
    public void setUp() {
        transaction = new Transaction();
        transaction.setTransactionId("1");
        transaction.setTimestamp("2023-10-05T16:21:00");
        transaction.setRoundUp(10.5F);
        transaction.setStatus("SUCCESS");
        transaction.setAmountTransferred(100.0F);
        transaction.setReceiverAccountNumber(12345L);
        transaction.setReceiverName("John Doe");
        transaction.setAccountNumber(67890L);
        transaction.setType("Deposit");
        transaction.setRemarks("Initial deposit");
        transaction.setFinalCurrentBalance(1000.0F);
        transaction.setFinalSavingsBalance(500.0F);
        transaction.setTransactionFee(5);
        transaction.setUserId("8989888");
    }

    @AfterEach
    public void tearDown() {
        transactionRepository.deleteAll();
        transaction = null;
    }

    @Test
    public void givenTransactionToSaveThenShouldReturnSavedTransaction() {
        transactionRepository.save(transaction);
        Transaction fetchedTransaction = transactionRepository.findById(transaction.getTransactionId()).get();
        assertEquals("1", fetchedTransaction.getTransactionId());
    }

    @Test
    public void givenGetAllTransactionsThenShouldReturnListOfAllTransactions() {
        Transaction transaction1 = new Transaction();
        // Set attributes for transaction1
        transactionRepository.save(transaction);
        transactionRepository.save(transaction1);

        List<Transaction> transactionList = transactionRepository.findAll();
        assertEquals(2, transactionList.size());
    }

    @Test
    public void givenTransactionIdThenShouldReturnRespectiveTransaction() {
        Transaction savedTransaction = transactionRepository.save(transaction);
        Optional<Transaction> optional = transactionRepository.findById(savedTransaction.getTransactionId());
        assertTrue(optional.isPresent());
        assertEquals(savedTransaction.getTransactionId(), optional.get().getTransactionId());
        assertEquals(savedTransaction.getStatus(), optional.get().getStatus());
    }

    @Test
    public void givenTransactionIdToDeleteThenShouldDeleteTransaction() {
        Transaction savedTransaction = transactionRepository.save(transaction);
        transactionRepository.deleteById(savedTransaction.getTransactionId());
        Optional<Transaction> optional = transactionRepository.findById(savedTransaction.getTransactionId());
        assertFalse(optional.isPresent());
    }
}

