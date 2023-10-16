package com.NatWest.ActivityService.Controller;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.NatWest.ActivityService.Exception.ResourceNotFoundException;
import com.NatWest.ActivityService.Model.Activity;
import com.NatWest.ActivityService.Repository.ActivityRepository;


public class ActivityControllerMockitoTest {

    @InjectMocks
    private ActivityController activityController;

    @Mock
    private ActivityRepository activityRepository;
    
    private Activity activity;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
        
        activity = new Activity();
		activity.setActivityId("7dfef5");
		activity.setUserId("9e5fe4f");
        activity.setType("Savings");
        activity.setDescription("Deposited 0.45 Euros");
        activity.setTimestamp("18788787878");
        activity.setIpAddress("102.5.195.11");
    }

    @Test
    public void testAddActivity() {
        Activity mockActivity = activity;
        when(activityRepository.save(any(Activity.class))).thenReturn(mockActivity);

        ResponseEntity<?> response = activityController.addActivity(mockActivity);

        verify(activityRepository, times(1)).save(any(Activity.class));
        assertEquals(HttpStatus.OK, response.getStatusCode());
    }

    @Test
    public void testGetAllActivity() {
        List<Activity> mockActivities = new ArrayList<>();
        when(activityRepository.findAll()).thenReturn(mockActivities);

        ResponseEntity<?> response = activityController.getAllActivity();

        verify(activityRepository, times(1)).findAll();
        assertEquals(HttpStatus.OK, response.getStatusCode());
    }

    @Test
    public void testGetActivityByIdFound() {
        Activity mockActivity = activity;
        when(activityRepository.findById("7dfef5")).thenReturn(Optional.of(mockActivity));

        ResponseEntity<?> response = activityController.getActivityById("7dfef5");

        verify(activityRepository, times(1)).findById("7dfef5");
        assertEquals(HttpStatus.OK, response.getStatusCode());
    }

    @Test
    public void testGetActivityByIdNotFound() {
        String invalidId = "999";
        when(activityRepository.findById(invalidId)).thenReturn(Optional.empty());

        ResourceNotFoundException exception = assertThrows(ResourceNotFoundException.class, () -> {
            activityController.getActivityById(invalidId);
        });

        assertEquals("Record not found with id : " + invalidId, exception.getMessage());
    }

    @Test
    public void testGetActivityByUserId() {
        List<Activity> mockActivities = new ArrayList<>();
        when(activityRepository.findAll()).thenReturn(mockActivities);

        ResponseEntity<?> response = activityController.getActivityByUserId("9e5fe4f");

        verify(activityRepository, times(1)).findAll();
        assertEquals(HttpStatus.OK, response.getStatusCode());
    }

    @Test
    public void testDeleteActivity() {
        doNothing().when(activityRepository).deleteById("7dfef5");

        ResponseEntity<?> response = activityController.deleteActivity("7dfef5");

        verify(activityRepository, times(1)).deleteById("7dfef5");
        assertEquals(HttpStatus.OK, response.getStatusCode());
    }
}
