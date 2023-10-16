package com.Capstone.Transaction.controller;
import com.Capstone.Transaction.Transaction;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import java.util.ArrayList;
import com.Capstone.Transaction.service.TransactionService;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import java.util.List;
import java.util.Optional;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import static org.hamcrest.Matchers.hasSize;

@WebMvcTest(TransactionController.class)
public class TransactionControllerIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private TransactionService transactionService;
    @Test
    public void testGetTransactionByIdNotFound() throws Exception {
        // Mock the service to return an empty Optional (transaction not found)
        when(transactionService.getTransactionById("nonExistentId")).thenReturn(Optional.empty());

        // Perform the GET request and verify a NOT_FOUND response
        mockMvc.perform(get("/nonExistentId"))
                .andExpect(status().isNotFound());
    }
}
