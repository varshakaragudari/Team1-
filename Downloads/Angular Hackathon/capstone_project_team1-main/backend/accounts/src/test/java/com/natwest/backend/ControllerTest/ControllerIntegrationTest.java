package com.natwest.backend.ControllerTest;
import com.natwest.backend.model.CurrentAccount;
import com.natwest.backend.model.SavingAccount;
import com.natwest.backend.services.CurrentAccService;
import com.natwest.backend.services.SavingAccService;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;


import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
@SpringBootTest
public class ControllerIntegrationTest {
    @Autowired
    CurrentAccService  currentAccService;
    @Autowired
    SavingAccService savingAccService;
    CurrentAccount currentAccount;
    SavingAccount savingAccount;

    @BeforeEach
    public  void  setCurrentAccount(){
        currentAccount = new CurrentAccount();
        currentAccount.setUserId("555");
        currentAccount.setAccountNumber(12345678901);
        currentAccount.setAccountHolderName("testzing");
        currentAccount.setBalance(2000);
        currentAccount.setCustId("cust123");
        currentAccount.setWalletId("wallet12");
        currentAccount.setDateOfJoining("20 june, 1990");

    }
    @BeforeEach
    public void setSavingAccount(){
        savingAccount= new SavingAccount();
        savingAccount.setUserId("555");
        savingAccount.setAccountNumber(87878);
        savingAccount.setAccountHolderName("testing");
        savingAccount.setBalance(2000);
        savingAccount.setCustId("cust123");
        savingAccount.setWalletId("wallet12");
        savingAccount.setDateOfJoining("20 june, 1990");
        savingAccount.setInterestRate(4);
    }
    @AfterEach
    public  void teardown(){
        currentAccount= null;
        savingAccount= null;
    }
    @Test
    public void TestingSaveOfCurrentAcc(){
        CurrentAccount savedAcc=  currentAccService.saveAcc(currentAccount);

        assertEquals(savedAcc.getUserId(),currentAccount.getUserId());
    }
    @Test
    public  void TestingSaveOfSavingAcc(){
        SavingAccount savedAcc = savingAccService.SaveAcc(savingAccount);

        assertEquals(savedAcc.getUserId(),savingAccount.getUserId());
    }
    @Test
    public  void  TestingUpdateOfCurrent(){
        CurrentAccount updated= currentAccService.UpdateBalance(5000,"123");
        assertEquals(updated.getBalance(),5000);
    }
    @Test
    public  void  TestingUpdateofSaving(){
        SavingAccount updated = savingAccService.UpdateBalance(1000,"123");
        assertEquals(updated.getBalance(),1000);
    }
}
