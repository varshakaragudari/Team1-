package com.NatWest.ActivityService.Repository;
import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.NatWest.ActivityService.Model.Activity;

@Repository
public interface ActivityRepository extends MongoRepository<Activity, String>{
		List<Activity> findAllByUserId(String userId);
}
