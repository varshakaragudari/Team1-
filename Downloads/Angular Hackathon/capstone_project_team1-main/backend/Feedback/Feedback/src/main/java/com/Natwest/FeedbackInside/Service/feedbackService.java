package com.Natwest.FeedbackInside.Service;

import com.Natwest.FeedbackInside.Model.feedback;
import com.Natwest.FeedbackInside.Repository.feedbackRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class feedbackService {
    @Autowired
    feedbackRepository feedbackrepository;
    public String savefeedback(feedback f) {
        feedbackrepository.save(f);
        return "feedback entered";
    }

    public List<feedback> fetchallfeedbacks() {
        return feedbackrepository.findAll();
    }

//    public List<feedback> fetchfeedback(String userId) {
//        return feedbackrepository.findByuserId(userId);
//
//    }
public List<Map<String, Object>> fetchfeedback(String userId) {
    List<feedback> feedbackList = feedbackrepository.findByuserId(userId);

    // Convert feedback objects to maps including _id
    return feedbackList.stream()
            .map(feedback -> {
                Map<String, Object> feedbackMap = new HashMap<>();
                feedbackMap.put("feedbackId", feedback.getFeedbackId());
                feedbackMap.put("userId", feedback.getUserId());
                feedbackMap.put("firstName", feedback.getFirstName());
                feedbackMap.put("lastName", feedback.getLastName());
                feedbackMap.put("email", feedback.getEmail());
                feedbackMap.put("phone", feedback.getPhone());
                feedbackMap.put("address", feedback.getAddress());
                feedbackMap.put("type", feedback.getType());
                feedbackMap.put("description", feedback.getDescription());
                feedbackMap.put("staff", feedback.getStaff());
                return feedbackMap;
            })
            .collect(Collectors.toList());
}

public List<feedback> fetchFeedbackByType(String type) {
    return feedbackrepository.findByType(type);
}

    public String deleteFeedbackByFeedbackId(String feedbackId) {
        feedbackrepository.deleteById(feedbackId);
        return "Feedback with feedbackId " + feedbackId + " has been deleted.";
    }
}
