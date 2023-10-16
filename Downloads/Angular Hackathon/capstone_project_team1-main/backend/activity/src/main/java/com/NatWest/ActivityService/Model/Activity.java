package com.NatWest.ActivityService.Model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.MongoId;

@Document(collection = "activity")
public class Activity {
	@Id
	@MongoId
	String activityId;
	String userId;
	String type;
	String description;
	String timestamp;
	String ipAddress;
	public String getActivityId() {
		return activityId;
	}
	public void setActivityId(String activityId) {
		this.activityId = activityId;
	}
	public String getUserId() {
		return userId;
	}
	public void setUserId(String userId) {
		this.userId = userId;
	}
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public String getTimestamp() {
		return timestamp;
	}
	public void setTimestamp(String timestamp) {
		this.timestamp = timestamp;
	}
	public String getIpAddress() {
		return ipAddress;
	}
	public void setIpAddress(String ipAddress) {
		this.ipAddress = ipAddress;
	}
	public Activity() {
		super();
	}
	public Activity(String activityId, String userId, String type, String description, String timestamp,
			String ipAddress) {
		super();
		this.activityId = activityId;
		this.userId = userId;
		this.type = type;
		this.description = description;
		this.timestamp = timestamp;
		this.ipAddress = ipAddress;
	}
	@Override
	public String toString() {
		return "Activity [activityId=" + activityId + ", userId=" + userId + ", type=" + type + ", description="
				+ description + ", timestamp=" + timestamp + ", ipAddress=" + ipAddress + "]";
	}
	
	
	
}
