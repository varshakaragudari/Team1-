package com.Natwest.FeedbackInside.Repository;

import com.Natwest.FeedbackInside.Model.feedback;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface feedbackRepository extends MongoRepository<feedback,String> {
    List<feedback> findByuserId(String userId);
    List<feedback> findByType(String type);
    feedback findByFeedbackId(String feedbackId);
}
