package com.NatWest.ActivityService.Controller;

import static org.junit.jupiter.api.Assertions.*;

import java.util.ArrayList;
import java.util.List;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.NatWest.ActivityService.Model.Activity;
import com.NatWest.ActivityService.Controller.ActivityController;

@SpringBootTest
class ActivityControllerTests {

	@Autowired
	private ActivityController activityController;
	
	private Activity activity;
	private List<Activity> activityList;
	
	@BeforeEach
    public void setUp() {
		activityController=new ActivityController();
		
		activity = new Activity();
		activity.setActivityId("7dfef5");
		activity.setUserId("9e5fe4f");
        activity.setType("Savings");
        activity.setDescription("Deposited 0.45 Euros");
        activity.setTimestamp("18788787878");
        activity.setIpAddress("102.5.195.11");
        activityList = new ArrayList<>();
        activityList.add(activity);
    }

    @AfterEach
    public void tearDown() {
        activity = null;
    }
    
    @Test
    public void testAddActivity() {
        ResponseEntity<?> response = activityController.addActivity(activity);
        assertEquals(HttpStatus.OK, response.getStatusCode());
    }
    
    @Test
    public void testGetActivityById() {
        ResponseEntity<?> response = activityController.getActivityById("7dfef5");
        assertEquals(HttpStatus.OK, response.getStatusCode());
    }
    
    @Test
    public void testGetActivityByUserId() {
        ResponseEntity<?> response = activityController.getActivityByUserId("9e5fe4f");
        assertEquals(HttpStatus.OK, response.getStatusCode());
    }
    
    @Test
    public void testDeleteActivity() {
        ResponseEntity<?> response = activityController.deleteActivity("7dfef5");
        assertEquals(HttpStatus.OK, response.getStatusCode());
    }


}
