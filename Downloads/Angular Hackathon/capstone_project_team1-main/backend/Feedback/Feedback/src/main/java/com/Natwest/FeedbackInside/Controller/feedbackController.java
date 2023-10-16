package com.Natwest.FeedbackInside.Controller;

import com.Natwest.FeedbackInside.Model.feedback;
import com.Natwest.FeedbackInside.Service.feedbackService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin("*")
@RequestMapping("/feedback")
public class feedbackController {
    @Autowired
    feedbackService feedbackservice;

    @PostMapping("/feedback")
    public String saveFeedback(@RequestBody feedback f){return feedbackservice.savefeedback(f);}
    @GetMapping("/feedback")
    public List<feedback> fetchallfeedbacks(){
        return feedbackservice.fetchallfeedbacks();
    }
//    @GetMapping("/feedback/userId/{userId}")
//    public List<feedback> fetchfeedbackUsingUserId(@PathVariable String userId){
//        return feedbackservice.fetchfeedback(userId);
//    }
@GetMapping("/feedback/userId/{userId}")
public List<Map<String, Object>> fetchfeedbackUsingUserId(@PathVariable String userId) {
    return feedbackservice.fetchfeedback(userId);
}
    @GetMapping("/feedback/type/{type}")
    public List<feedback> fetchfeedbackUsingType(@PathVariable String type){
        return feedbackservice.fetchFeedbackByType(type);
    }
    @DeleteMapping("/feedback/{feedbackId}")
    public String deleteFeedbackByFeedbackId(@PathVariable String feedbackId) {
        return feedbackservice.deleteFeedbackByFeedbackId(feedbackId);
    }
}
