package com.Capstone.Transaction;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.MongoId;

import java.sql.Timestamp;

@Document
public class Transaction {
    @Id
    @MongoId
    private String transactionId;
    private String timestamp;
    private Float roundUp;
    private String status;
    private Float amountTransferred;
    private Long receiverAccountNumber;
    private String receiverName;
    private Long accountNumber;
    private String type;
    private String remarks;
    private Float finalCurrentBalance;
    private Float finalSavingsBalance;
    private Integer transactionFee;
    private String userId;

    public Transaction() {
    }

    public Transaction(String timestamp, Float roundUp, String status, Float amountTransferred,
                       Long receiverAccountNumber, String receiverName, Long accountNumber,
                       String type, String remarks, Float finalCurrentBalance, Float finalSavingsBalance,
                       Integer transactionFee, String userId) {
        this.timestamp = timestamp;
        this.roundUp = roundUp;
        this.status = status;
        this.amountTransferred = amountTransferred;
        this.receiverAccountNumber = receiverAccountNumber;
        this.receiverName = receiverName;
        this.accountNumber = accountNumber;
        this.type = type;
        this.remarks = remarks;
        this.finalCurrentBalance = finalCurrentBalance;
        this.finalSavingsBalance = finalSavingsBalance;
        this.transactionFee = transactionFee;
        this.userId =userId;
    }

    public String getTransactionId() {
        return transactionId;
    }

    public void setTransactionId(String transactionId) {
        this.transactionId = transactionId;
    }

    public String getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(String timestamp) {
        this.timestamp = timestamp;
    }

    public Float getRoundUp() {
        return roundUp;
    }

    public void setRoundUp(Float roundUp) {
        this.roundUp = roundUp;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Float getAmountTransferred() {
        return amountTransferred;
    }

    public void setAmountTransferred(Float amountTransferred) {
        this.amountTransferred = amountTransferred;
    }

    public Long getReceiverAccountNumber() {
        return receiverAccountNumber;
    }

    public void setReceiverAccountNumber(Long receiverAccountNumber) {
        this.receiverAccountNumber = receiverAccountNumber;
    }

    public String getReceiverName() {
        return receiverName;
    }

    public void setReceiverName(String receiverName) {
        this.receiverName = receiverName;
    }

    public Long getAccountNumber() {
        return accountNumber;
    }

    public void setAccountNumber(Long accountNumber) {
        this.accountNumber = accountNumber;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getRemarks() {
        return remarks;
    }

    public void setRemarks(String remarks) {
        this.remarks = remarks;
    }

    public Float getFinalCurrentBalance() {
        return finalCurrentBalance;
    }

    public void setFinalCurrentBalance(Float finalCurrentBalance) {
        this.finalCurrentBalance = finalCurrentBalance;
    }

    public Float getFinalSavingsBalance() {
        return finalSavingsBalance;
    }

    public void setFinalSavingsBalance(Float finalSavingsBalance) {
        this.finalSavingsBalance = finalSavingsBalance;
    }

    public Integer getTransactionFee() {
        return transactionFee;
    }

    public void setTransactionFee(Integer transactionFee) {
        this.transactionFee = transactionFee;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    @Override
    public String toString() {
        return "Transaction{" +
                "transactionId='" + transactionId + '\'' +
                ", timestamp=" + timestamp +
                ", roundUp=" + roundUp +
                ", status='" + status + '\'' +
                ", amountTransferred=" + amountTransferred +
                ", receiverAccountNumber=" + receiverAccountNumber +
                ", receiverName='" + receiverName + '\'' +
                ", accountNumber=" + accountNumber +
                ", type='" + type + '\'' +
                ", remarks='" + remarks + '\'' +
                ", finalCurrentBalance=" + finalCurrentBalance +
                ", finalSavingsBalance=" + finalSavingsBalance +
                ", transactionFee=" + transactionFee +
                ", userId=" + userId +
                '}';
    }
}

