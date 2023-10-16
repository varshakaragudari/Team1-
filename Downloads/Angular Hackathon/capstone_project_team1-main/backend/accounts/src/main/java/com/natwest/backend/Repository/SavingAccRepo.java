package com.natwest.backend.Repository;

import com.natwest.backend.model.SavingAccount;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface SavingAccRepo extends MongoRepository<SavingAccount,String> {
}
