package com.project.User.Model;

public class RegistrationResponse {
    private String message;
    private String custId;
    private long debitCardNumber;
    private String expiry;
    private int cvv;

    public RegistrationResponse() {
    }

    public RegistrationResponse(String message, String custId, long debitCardNumber, String expiry, int cvv) {
        this.message = message;
        this.custId = custId;
        this.debitCardNumber = debitCardNumber;
        this.expiry = expiry;
        this.cvv = cvv;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getCustId() {
        return custId;
    }

    public void setCustId(String custId) {
        this.custId = custId;
    }

    public long getDebitCardNumber() {
        return debitCardNumber;
    }

    public void setDebitCardNumber(long debitCardNumber) {
        this.debitCardNumber = debitCardNumber;
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
        return "RegistrationResponse{" +
                "message='" + message + '\'' +
                ", custId='" + custId + '\'' +
                ", debitCardNumber=" + debitCardNumber +
                ", expiry='" + expiry + '\'' +
                ", cvv=" + cvv +
                '}';
    }

}