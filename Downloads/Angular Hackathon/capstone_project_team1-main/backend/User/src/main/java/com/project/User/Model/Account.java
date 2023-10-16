package com.project.User.Model;

import lombok.*;

import java.sql.Timestamp;
import java.util.Date;


public class Account {
    String type;
    long accountNumber;
    float accountBalance;
    String lastUpdate;

    public Account(String type, long accountNumber, float accountBalance, String lastUpdate) {
        this.type = type;
        this.accountNumber = accountNumber;
        this.accountBalance = accountBalance;
        this.lastUpdate = lastUpdate;
    }

    public Account() {
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public long getAccountNumber() {
        return accountNumber;
    }

    public void setAccountNumber(long accountNumber) {
        this.accountNumber = accountNumber;
    }

    public float getAccountBalance() {
        return accountBalance;
    }

    public void setAccountBalance(float accountBalance) {
        this.accountBalance = accountBalance;
    }

    public String getLastUpdate() {
        return lastUpdate;
    }

    public void setLastUpdate(String lastUpdate) {
        this.lastUpdate = lastUpdate;
    }

    @Override
    public String toString() {
        return "Account{" +
                "type='" + type + '\'' +
                ", accountNumber=" + accountNumber +
                ", accountBalance=" + accountBalance +
                ", lastUpdate='" + lastUpdate + '\'' +
                '}';
    }
}
