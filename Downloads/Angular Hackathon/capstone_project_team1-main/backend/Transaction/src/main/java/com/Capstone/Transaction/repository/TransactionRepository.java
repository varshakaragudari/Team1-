package com.Capstone.Transaction.repository;

import com.Capstone.Transaction.Transaction;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface TransactionRepository extends MongoRepository<Transaction, String> {
    // Define custom query methods if needed
}
