package com.project.User.Model;

import lombok.*;


public class LoginData {
    String custId;
    long cardNumber;
    String passwordHash;

    public LoginData(String custId, long cardNumber, String passwordHash) {
        this.custId = custId;
        this.cardNumber = cardNumber;
        this.passwordHash = passwordHash;
    }

    public LoginData() {
    }

    public String getCustId() {
        return custId;
    }

    public void setCustId(String custId) {
        this.custId = custId;
    }

    public long getCardNumber() {
        return cardNumber;
    }

    public void setCardNumber(long cardNumber) {
        this.cardNumber = cardNumber;
    }

    public String getPasswordHash() {
        return passwordHash;
    }

    public void setPasswordHash(String passwordHash) {
        this.passwordHash = passwordHash;
    }

    @Override
    public String toString() {
        return "LoginData{" +
                "custId='" + custId + '\'' +
                ", cardNumber=" + cardNumber +
                ", passwordHash='" + passwordHash + '\'' +
                '}';
    }
}
