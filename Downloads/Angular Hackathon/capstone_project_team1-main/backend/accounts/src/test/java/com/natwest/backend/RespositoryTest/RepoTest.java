package com.natwest.backend.RespositoryTest;

import com.natwest.backend.Repository.CurrentAccountRepo;
import com.natwest.backend.Repository.SavingAccRepo;
import com.natwest.backend.model.CurrentAccount;
import com.natwest.backend.model.SavingAccount;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
@SpringBootTest
public class RepoTest {
    @Autowired
    CurrentAccountRepo currentAccountRepo;
    @Autowired
    SavingAccRepo savingAccRepo;
    SavingAccount savingAccount1;
    CurrentAccount currentAccount1;

    @BeforeEach
    public  void  SetUpCurrent(){
        currentAccount1 = new CurrentAccount();
        currentAccount1.setUserId("456");
        currentAccount1.setAccountNumber(12345);
        currentAccount1.setAccountHolderName("testing");
        currentAccount1.setBalance(2000);
        currentAccount1.setCustId("cust1234");
        currentAccount1.setWalletId("wallet12");
        currentAccount1.setDateOfJoining("20 june, 1990");
    }
    @BeforeEach
    public void setSavingAccount(){
        savingAccount1= new SavingAccount();
        savingAccount1.setUserId("456");
        savingAccount1.setAccountNumber(87878);
        savingAccount1.setAccountHolderName("testing");
        savingAccount1.setBalance(2000);
        savingAccount1.setCustId("cust1234");
        savingAccount1.setWalletId("wallet12");
        savingAccount1.setDateOfJoining("20 june, 1990");
        savingAccount1.setInterestRate(4);
    }
    //    @AfterEach
//    public  void teardown(){
//        currentAccount1= null;
//        savingAccount1= null;
//    }
    @Test
    public void TestingFound(){
        CurrentAccount found= currentAccountRepo.findById("456").get();
        assertEquals(found.getCustId(),"cust123");
    }
    @Test
    public  void  TestingSavingFound(){
        SavingAccount found = savingAccRepo.findById("456").get();
        assertEquals(found.getCustId(),"cust123");
    }
    @Test
    public  void  TestingNullCurrent(){
        CurrentAccount notFound = currentAccountRepo.findById("abc").orElse(null);
        assertNull(notFound);
        SavingAccount SavenotFound = savingAccRepo.findById("23").orElse(null);
        assertNull(SavenotFound);
    }

}

