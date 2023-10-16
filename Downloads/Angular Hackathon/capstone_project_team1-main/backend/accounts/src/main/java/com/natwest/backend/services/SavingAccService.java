package com.natwest.backend.services;

import com.natwest.backend.Repository.SavingAccRepo;
import com.natwest.backend.model.CurrentAccount;
import com.natwest.backend.model.SavingAccount;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;

@Service
public class SavingAccService {
    @Autowired
    SavingAccRepo savingAccRepo;

    public SavingAccount FindAccountByUserId(String userId){
       SavingAccount savingAccount = savingAccRepo.findById(userId).orElse(null);

        return savingAccount;
    }

    public SavingAccount FindAccountByCustId(String custId) {

        List<SavingAccount> AllAcc = savingAccRepo.findAll();
        SavingAccount found=  AllAcc.stream().filter(acc-> Objects.equals(acc.getCustId(), custId)).findFirst().orElse(null);
        System.out.println(found+"   "+ custId);
        return  found;
    }



    public SavingAccount DeleteByUserId(String userId) {
        SavingAccount savingAccount= savingAccRepo.findById(userId).orElse(null);
        if(savingAccount!=null){
            savingAccRepo.deleteById(userId);
            return  savingAccount;
        }
        return null;
    }

    public SavingAccount UpdateAccount(SavingAccount update) {
        String id= update.getUserId();
        SavingAccount savingAccount = savingAccRepo.findById(id).orElse(null);
        if(savingAccount!=null){
            savingAccRepo.save(update);
            return savingAccRepo.findById(id).orElse(null);
        }
        return null;
    }

    public SavingAccount SaveAcc(SavingAccount sa) {
        SavingAccount found = savingAccRepo.findById(sa.getUserId()).orElse(null);
        if(found!=null){
            return  null;
        }
        SavingAccount savingAccount= savingAccRepo.save(sa);
        return savingAccount;

    }

    public SavingAccount UpdateBalance(float bal, String userId) {
        SavingAccount savingAccount = savingAccRepo.findById(userId).orElse(null);
        if(savingAccount!=null){
           savingAccount.setBalance(bal);
            savingAccRepo.save(savingAccount);
              SavingAccount updated = savingAccRepo.findById(userId).orElse(null);
            return updated;
        }
        return null;
    }

    public SavingAccount FindAccountByAccountNumber(Long AccountNumber) {
        List<SavingAccount> AllAcc = savingAccRepo.findAll();
        SavingAccount found=  AllAcc.stream().filter(acc-> Objects.equals(acc.getAccountNumber(), AccountNumber)).findFirst().orElse(null);
        System.out.println(found+"   "+ AccountNumber);
        return  found;
    }
}
