package com.natwest.backend.Repository;

import com.natwest.backend.model.CurrentAccount;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface CurrentAccountRepo extends MongoRepository<CurrentAccount,String> {
}
