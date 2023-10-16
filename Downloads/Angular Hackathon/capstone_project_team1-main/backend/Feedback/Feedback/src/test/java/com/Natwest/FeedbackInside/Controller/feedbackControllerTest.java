package com.Natwest.FeedbackInside.Controller;
import com.Natwest.FeedbackInside.Model.feedback;
import com.Natwest.FeedbackInside.Service.feedbackService;
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

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import static org.mockito.Mockito.*;
public class feedbackControllerTest {
    @InjectMocks
    private feedbackController controller;

    @Mock
    private feedbackService feedbackservice;

    private MockMvc mockMvc;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
        mockMvc = MockMvcBuilders.standaloneSetup(controller).build();
    }
    @Test
    public void testSaveFeedback() throws Exception {
        feedback feedback = new feedback(); // Create a sample feedback object
        when(feedbackservice.savefeedback(any(feedback.class))).thenReturn("Feedback saved successfully");

        mockMvc.perform(MockMvcRequestBuilders.post("/feedback")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{}"))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().string("Feedback saved successfully"));

        verify(feedbackservice, times(1)).savefeedback(any(feedback.class));
    }

    @Test
    public void testFetchAllFeedbacks() throws Exception {
        List<feedback> feedbackList = new ArrayList<>();
        when(feedbackservice.fetchallfeedbacks()).thenReturn(feedbackList);

        mockMvc.perform(MockMvcRequestBuilders.get("/feedback"))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$.size()").value(feedbackList.size()));

        verify(feedbackservice, times(1)).fetchallfeedbacks();
    }
    @Test
    public void testFetchFeedbackUsingUserId() throws Exception {
        String userId = "123";
        List<Map<String, Object>> feedbackList = new ArrayList<>();
        when(feedbackservice.fetchfeedback(userId)).thenReturn(feedbackList);

        mockMvc.perform(MockMvcRequestBuilders.get("/feedback/userId/{userId}", userId))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$.size()").value(feedbackList.size()));

        verify(feedbackservice, times(1)).fetchfeedback(userId);
    }


}
