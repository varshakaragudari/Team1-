package com.Capstone.Transaction.controller;
import com.Capstone.Transaction.Transaction;
import com.Capstone.Transaction.service.TransactionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin("http://localhost:3000")
@RequestMapping("/transaction")
public class TransactionController {
    private final TransactionService transactionService;

    @Autowired
    public TransactionController(TransactionService transactionService) {
        this.transactionService = transactionService;
    }

    @GetMapping("/")
    @CrossOrigin("http://localhost:3000")
    public List<Transaction> getAllTransactions() {
        return transactionService.getAllTransactions();
    }

    @GetMapping("/{transactionId}")
    public ResponseEntity<Transaction> getTransactionById(@PathVariable String transactionId) {
        Optional<Transaction> transaction = transactionService.getTransactionById(transactionId);
        return transaction.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PostMapping("/transactions")
    public ResponseEntity<Transaction> createTransaction(@RequestBody Transaction transaction) {
//        transaction.setUserId(userId);
        Transaction createdTransaction = transactionService.createTransaction(transaction);
        return new ResponseEntity<>(createdTransaction, HttpStatus.CREATED);
    }


    @DeleteMapping("/{transactionId}")
    public ResponseEntity<Void> deleteTransaction(@PathVariable String transactionId) {
        transactionService.deleteTransaction(transactionId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
    @GetMapping("/byUserId/{userId}")
    public List<Transaction> getTransactionsByUserId(@PathVariable String userId) {
        return transactionService.getTransactionsByUserId(userId);
    }

    @GetMapping("/byUserIdAndType/{userId}/{type}")
    public List<Transaction> getTransactionsByUserIdAndType(
            @PathVariable String userId,
            @PathVariable String type
    ) {
        return transactionService.getTransactionsByUserIdAndType(userId, type);
    }
}
