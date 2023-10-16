package com.project.User.Model;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.deser.std.DateDeserializers;
import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.MongoId;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;



@Document(collection = "users")
public class User {
    @Id
    @MongoId
    String userId;
    String custId;
    String firstName;
    String lastName;
    String email;
    String address;
    String city;
    String state;
    String country;
    String dob;
    long phoneNumber;
//    password = pin+password
    String passwordHash;
    List<Account> accounts = new ArrayList<>();
    List<Card> cards = new ArrayList<>();


    public User(String userId, String custId, String firstName, String lastName, String email, String address, String city, String state, String country, String dob, long phoneNumber, String passwordHash, List<Account> accounts, List<Card> cards) {
        this.userId = userId;
        this.custId = custId;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.address = address;
        this.city = city;
        this.state = state;
        this.country = country;
        this.dob = dob;
        this.phoneNumber = phoneNumber;
        this.passwordHash = passwordHash;
        this.accounts = accounts;
        this.cards = cards;
    }

    public User() {
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getCustId() {
        return custId;
    }

    public void setCustId(String custId) {
        this.custId = custId;
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

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public String getDob() {
        return dob;
    }

    public void setDob(String dob) {
        this.dob = dob;
    }

    public long getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(long phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getPasswordHash() {
        return passwordHash;
    }

    public void setPasswordHash(String passwordHash) {
        this.passwordHash = passwordHash;
    }

    public List<Account> getAccounts() {
        return accounts;
    }

    public void setAccounts(List<Account> accounts) {
        this.accounts = accounts;
    }

    public List<Card> getCards() {
        return cards;
    }

    public void setCards(List<Card> cards) {
        this.cards = cards;
    }

    @Override
    public String toString() {
        return "User{" +
                "userId='" + userId + '\'' +
                ", custId='" + custId + '\'' +
                ", firstName='" + firstName + '\'' +
                ", lastName='" + lastName + '\'' +
                ", email='" + email + '\'' +
                ", address='" + address + '\'' +
                ", city='" + city + '\'' +
                ", state='" + state + '\'' +
                ", country='" + country + '\'' +
                ", dob='" + dob + '\'' +
                ", phoneNumber=" + phoneNumber +
                ", passwordHash='" + passwordHash + '\'' +
                ", accounts=" + accounts +
                ", cards=" + cards +
                '}';
    }
}
