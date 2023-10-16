package com.natwest.backend.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.MongoId;

import java.sql.Timestamp;

public class SavingAccount {
    Long accountNumber;
    String accountHolderName;
    float balance;
    String walletId;
    @Id
    String userId;
    String dateOfJoining;
    float interestRate;

    String custId;
    public SavingAccount() {
    }

    public SavingAccount(Long accountNumber, String accountHolderName, float balance, String walletId, String userId, String dateOfJoining, float interestRate, String custId) {
        this.accountNumber = accountNumber;
        this.accountHolderName = accountHolderName;
        this.balance = balance;
        this.walletId = walletId;
        this.userId = userId;
        this.dateOfJoining = dateOfJoining;
        this.interestRate = interestRate;
        this.custId = custId;
    }

    public Long getAccountNumber() {
        return accountNumber;
    }

    public void setAccountNumber(Long accountNumber) {
        this.accountNumber = accountNumber;
    }

    public String getAccountHolderName() {
        return accountHolderName;
    }

    public void setAccountHolderName(String accountHolderName) {
        this.accountHolderName = accountHolderName;
    }

    public float getBalance() {
        return balance;
    }

    public void setBalance(float balance) {
        this.balance = balance;
    }

    public String getWalletId() {
        return walletId;
    }

    public void setWalletId(String walletId) {
        this.walletId = walletId;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getDateOfJoining() {
        return dateOfJoining;
    }

    public void setDateOfJoining(String dateOfJoining) {
        this.dateOfJoining = dateOfJoining;
    }

    public float getInterestRate() {
        return interestRate;
    }

    public void setInterestRate(float interestRate) {
        this.interestRate = interestRate;
    }

    public String getCustId() {
        return custId;
    }

    public void setCustId(String custId) {
        this.custId = custId;
    }

    @Override
    public String toString() {
        return "SavingAccount{" +
                "accountNumber=" + accountNumber +
                ", accountHolderName='" + accountHolderName + '\'' +
                ", balance=" + balance +
                ", walletId='" + walletId + '\'' +
                ", userId='" + userId + '\'' +
                ", dateOfJoining=" + dateOfJoining +
                ", interestRate=" + interestRate +
                ", custId='" + custId + '\'' +
                '}';
    }
}
