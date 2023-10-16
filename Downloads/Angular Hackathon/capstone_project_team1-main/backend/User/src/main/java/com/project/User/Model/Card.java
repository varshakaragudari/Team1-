package com.project.User.Model;

import lombok.*;


public class Card {
    String type;
    long cardNumber;
    float accountBalance;
    String expiry;
    int cvv;

    public Card(String type, long cardNumber, float accountBalance, String expiry, int cvv) {
        this.type = type;
        this.cardNumber = cardNumber;
        this.accountBalance = accountBalance;
        this.expiry = expiry;
        this.cvv = cvv;
    }

    public Card() {
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public long getCardNumber() {
        return cardNumber;
    }

    public void setCardNumber(long cardNumber) {
        this.cardNumber = cardNumber;
    }

    public float getAccountBalance() {
        return accountBalance;
    }

    public void setAccountBalance(float accountBalance) {
        this.accountBalance = accountBalance;
    }

    public String getExpiry() {
        return expiry;
    }

    public void setExpiry(String expiry) {
        this.expiry = expiry;
    }

    public int getCvv() {
        return cvv;
    }

    public void setCvv(int cvv) {
        this.cvv = cvv;
    }

    @Override
    public String toString() {
        return "Card{" +
                "type='" + type + '\'' +
                ", cardNumber=" + cardNumber +
                ", accountBalance=" + accountBalance +
                ", expiry='" + expiry + '\'' +
                ", cvv=" + cvv +
                '}';
    }
}
