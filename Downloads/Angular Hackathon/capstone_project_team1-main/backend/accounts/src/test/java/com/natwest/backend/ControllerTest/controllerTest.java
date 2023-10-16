package com.natwest.backend.ControllerTest;
import com.fasterxml.jackson.databind.ObjectMapper;

import com.natwest.backend.controllers.Controller;
import com.natwest.backend.model.CurrentAccount;
import com.natwest.backend.model.SavingAccount;
import com.natwest.backend.services.CurrentAccService;
import com.natwest.backend.services.SavingAccService;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultHandlers;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.util.ArrayList;
import java.util.List;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@ExtendWith(MockitoExtension.class)
public class controllerTest {
    private  MockMvc mockMvc;

    @Mock
    CurrentAccService currentAccService;
    @Mock
    SavingAccService savingAccService;
    @InjectMocks
    Controller controller;
    CurrentAccount currentAccount;
    SavingAccount savingAccount;
    @BeforeEach
    public  void  setCurrentAccount(){
        MockitoAnnotations.initMocks(this);
        mockMvc = MockMvcBuilders.standaloneSetup(controller).build();
        currentAccount = new CurrentAccount();
        currentAccount.setUserId("123");
        currentAccount.setAccountNumber(12345);
        currentAccount.setAccountHolderName("testing");
        currentAccount.setBalance(2000);
        currentAccount.setCustId("cust123");
        currentAccount.setWalletId("wallet12");
        currentAccount.setDateOfJoining("20 june, 1990");

    }
    @BeforeEach
    public void setSavingAccount(){
        MockitoAnnotations.initMocks(this);
        mockMvc = MockMvcBuilders.standaloneSetup(controller).build();
        savingAccount= new SavingAccount();
        savingAccount.setUserId("123");
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
    public static String asJsonString(final Object obj) {
        try {
            return new ObjectMapper().writeValueAsString(obj);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
    @Test
    public void givenAccToSaveThenShouldReturnCurrentAcc() throws Exception {
        when(currentAccService.saveAcc(any())).thenReturn(currentAccount);
        mockMvc.perform(post("/postCurrent")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(asJsonString(currentAccount)))
                .andExpect(status().isOk())
                .andDo(MockMvcResultHandlers.print());
        verify(currentAccService).saveAcc(any());
    }
    @Test
    public void givenAccToSaveThenShouldReturnSavedAcc() throws Exception {
        when(savingAccService.SaveAcc(any())).thenReturn(savingAccount);
        mockMvc.perform(post("/postSaving")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(asJsonString(savingAccount)))
                .andExpect(status().isOk())
                .andDo(MockMvcResultHandlers.print());
        verify(savingAccService).SaveAcc(any());
    }
    @Test
    void givenUserIdThenShouldReturnCurrentAcc() throws Exception {
        when(currentAccService.FindAccountByUserId(currentAccount.getUserId())).thenReturn(currentAccount);
        mockMvc.perform(get("/getCurrrent/userId/123"))
                .andExpect(MockMvcResultMatchers.status()
                        .isOk())
                .andDo(MockMvcResultHandlers.print());

    }
    @Test
    void givenUserIdThenShouldReturnSavingAcc() throws Exception {
        when(savingAccService.FindAccountByUserId(savingAccount.getUserId())).thenReturn(savingAccount);
        mockMvc.perform(get("/getSaving/userId/123"))
                .andExpect(MockMvcResultMatchers.status()
                        .isOk())
                .andDo(MockMvcResultHandlers.print());

    }
    @Test
    public void givenAccToUpdateThenShouldReturnUpdatedAcc() throws Exception {
        when(currentAccService.UpdateBalance(3000,"123")).thenReturn(currentAccount);
        mockMvc.perform(put("/updateCurrentBalance/123").contentType(MediaType.APPLICATION_JSON).content(asJsonString(3000)))
                .andExpect(status().isOk()).andDo(MockMvcResultHandlers.print());
    }


}
