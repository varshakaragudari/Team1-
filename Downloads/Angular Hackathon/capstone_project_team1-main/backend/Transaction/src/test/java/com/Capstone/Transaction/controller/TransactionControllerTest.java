package com.Capstone.Transaction.controller;

import com.Capstone.Transaction.Transaction;
import com.Capstone.Transaction.service.TransactionService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

public class TransactionControllerTest {

    private MockMvc mockMvc;

    @Mock
    private TransactionService transactionService;

    @InjectMocks
    private TransactionController transactionController;

    private Transaction transaction;
    private List<Transaction> transactionList;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.initMocks(this);
        mockMvc = MockMvcBuilders.standaloneSetup(transactionController).build();

        // Create a sample transaction
        transaction = new Transaction();
        transaction.setTransactionId("1");
        transaction.setTimestamp(new String(String.valueOf(System.currentTimeMillis())));
        transaction.setRoundUp(10.5f);
        transactionList = new ArrayList<>();
        transactionList.add(transaction);
    }

    @Test
    public void testCreateTransaction() throws Exception {
        when(transactionService.createTransaction(any())).thenReturn(transaction);

        mockMvc.perform(post("/transactions/")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(asJsonString(transaction)))
                .andExpect(status().isCreated());

        verify(transactionService, times(1)).createTransaction(any());
    }

    public static String asJsonString(final Object obj) {
        try {
            return new ObjectMapper().writeValueAsString(obj);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
}

