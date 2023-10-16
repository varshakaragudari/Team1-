package com.Natwest.FeedbackInside.Service;
import com.Natwest.FeedbackInside.Model.feedback;
import com.Natwest.FeedbackInside.Repository.feedbackRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import static org.mockito.Mockito.*;
public class feedbackServiceTest {
    @InjectMocks
    private feedbackService service;

    @Mock
    private feedbackRepository repository;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }
    @Test
    public void testSaveFeedback() {
        feedback feedback = new feedback(); // Create a sample feedback object

        // Mock the repository's save method
        when(repository.save(any(feedback.class))).thenReturn(feedback);

        // Call the service method
        String result = service.savefeedback(feedback);

        // Verify that the repository's save method was called once
        verify(repository, times(1)).save(any(feedback.class));

        // Assert the result
        assert result.equals("feedback entered");
    }

    @Test
    public void testFetchAllFeedbacks() {
        List<feedback> feedbackList = new ArrayList<>();

        // Mock the repository's findAll method
        when(repository.findAll()).thenReturn(feedbackList);

        // Call the service method
        List<feedback> result = service.fetchallfeedbacks();

        // Verify that the repository's findAll method was called once
        verify(repository, times(1)).findAll();

        // Assert the result
        assert result.equals(feedbackList);
    }

    @Test
    public void testFetchFeedbackUsingUserId() {
        String userId = "123";
        List<feedback> feedbackList = new ArrayList<>();

        // Mock the repository's findByuserId method
        when(repository.findByuserId(userId)).thenReturn(feedbackList);

        // Call the service method
        List<Map<String, Object>> result = service.fetchfeedback(userId);

        // Verify that the repository's findByuserId method was called once
        verify(repository, times(1)).findByuserId(userId);

        // Add assertions for the result as needed
    }

    @Test
    public void testFetchFeedbackByType() {
        String type = "Type";

        // Create a sample feedback list
        List<feedback> feedbackList = new ArrayList<>();
        // Mock the repository's findByType method
        when(repository.findByType(type)).thenReturn(feedbackList);

        // Call the service method
        List<feedback> result = service.fetchFeedbackByType(type);

        // Verify that the repository's findByType method was called once
        verify(repository, times(1)).findByType(type);

        // Add assertions for the result as needed
    }

    @Test
    public void testDeleteFeedbackByFeedbackId() {
        String feedbackId = "123";

        // Mock the repository's deleteById method
        doNothing().when(repository).deleteById(feedbackId);

        // Call the service method
        String result = service.deleteFeedbackByFeedbackId(feedbackId);

        // Verify that the repository's deleteById method was called once
        verify(repository, times(1)).deleteById(feedbackId);

        // Add assertions for the result as needed
    }

    // Add more test methods for other service methods as needed
}








