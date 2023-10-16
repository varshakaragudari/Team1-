package com.natwest.backend.ServiceTest;


import com.natwest.backend.Repository.CurrentAccountRepo;
import com.natwest.backend.Repository.SavingAccRepo;
import com.natwest.backend.model.CurrentAccount;
import com.natwest.backend.model.SavingAccount;
import com.natwest.backend.services.CurrentAccService;
import com.natwest.backend.services.SavingAccService;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class ServiceIntegrationTest {
    @Mock
    CurrentAccountRepo currentAccountRepo;
    @Mock
    SavingAccRepo savingAccRepo;
    @InjectMocks
    CurrentAccService currentAccService;
    @InjectMocks
    SavingAccService savingAccService;

    CurrentAccount currentAccount,currentAccount1;
    SavingAccount savingAccount,savingAccount1;
    Optional optional,optional1;


    @BeforeEach
    public  void  setCurrentAccount(){
        MockitoAnnotations.initMocks(this);

        currentAccount = new CurrentAccount();
        currentAccount.setUserId("123");
        currentAccount.setAccountNumber(12345L);
        currentAccount.setAccountHolderName("testing");
        currentAccount.setBalance(2000);
        currentAccount.setCustId("cust123");
        currentAccount.setWalletId("wallet12");
        currentAccount.setDateOfJoining("20 june, 1990");
        optional= Optional.of(currentAccount);
    }
    @BeforeEach
    public void setSavingAccount(){
        MockitoAnnotations.initMocks(this);

        savingAccount= new SavingAccount();
        savingAccount.setUserId("123");
        savingAccount.setAccountNumber(87878L);
        savingAccount.setAccountHolderName("testing");
        savingAccount.setBalance(2000);
        savingAccount.setCustId("cust123");
        savingAccount.setWalletId("wallet12");
        savingAccount.setDateOfJoining("20 june, 1990");
        savingAccount.setInterestRate(4);
        optional1 = Optional.of(savingAccount);
    }
    @AfterEach
    public  void teardown(){
        currentAccount= null;
        savingAccount= null;
    }
    @Test
    public void givenAccToSaveThenShouldReturnSavedAcc() {
        when(currentAccountRepo.save(any())).thenReturn(currentAccount);
        assertEquals(currentAccount, currentAccService.saveAcc(currentAccount));
        verify(currentAccountRepo, times(1)).save(any());
    }
    @Test
    public void givenBlogIdThenShouldReturnRespectiveBlog() {
        when(currentAccountRepo.findById(anyString())).thenReturn(Optional.of(currentAccount));
        CurrentAccount retrievedAcc = currentAccService.FindAccountByUserId(currentAccount.getUserId());
        verify(currentAccountRepo, times(1)).findById(anyString());

    }


}

