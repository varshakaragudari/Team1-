package com.Natwest.FeedbackInside.Model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Document(collection = "feedbacks")
public class feedback {
    @Id
    private String feedbackId;
    private String userId;
    private String firstName;
    private String lastName;
    private String email;
    private String phone;
    private String address;
    private String type;
    private String description;
    private String staff;

    public feedback(String userId, String firstName, String lastName, String email, String phone, String address, String type, String description, String staff) {
        this.userId = userId;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.phone = phone;
        this.address = address;
        this.type = type;
        this.description = description;
        this.staff = staff;
    }

    public feedback() {
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }


    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public void setStaff(String staff) {
        this.staff = staff;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
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

    public String getFeedbackId() {
        return feedbackId;
    }

    public void setFeedbackId(String feedbackId) {
        this.feedbackId = feedbackId;
    }

    public String getStaff() {
        return staff;
    }

    @Override
    public String toString() {
        return "feedback{" +
                "feedbackId='" + feedbackId + '\'' +
                ", userId='" + userId + '\'' +
                ", firstName='" + firstName + '\'' +
                ", lastName='" + lastName + '\'' +
                ", email='" + email + '\'' +
                ", phone='" + phone + '\'' +
                ", address='" + address + '\'' +
                ", type='" + type + '\'' +
                ", description='" + description + '\'' +
                ", staff='" + staff + '\'' +
                '}';
    }
}
