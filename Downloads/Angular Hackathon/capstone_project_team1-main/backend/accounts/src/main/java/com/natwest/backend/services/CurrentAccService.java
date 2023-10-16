package com.natwest.backend.services;

import com.natwest.backend.Repository.CurrentAccountRepo;
import com.natwest.backend.model.CurrentAccount;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.awt.font.OpenType;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class CurrentAccService {
    @Autowired
    CurrentAccountRepo currentAccountRepo;

    public CurrentAccount FindAccountByCustId(String custId) {
      List<CurrentAccount> AllAcc = currentAccountRepo.findAll();
   CurrentAccount found=  AllAcc.stream().filter(acc-> Objects.equals(acc.getCustId(), custId)).findFirst().orElse(null);
  System.out.println(found+"   "+ custId);
        return  found;
    }
    public CurrentAccount FindAccountByUserId(String userid){
        CurrentAccount currentAccount= currentAccountRepo.findById(userid).orElse(null);
        return  currentAccount;
    }
    public CurrentAccount FindAccountByAccountNumber(Long AccountNumber) {
        List<CurrentAccount> AllAcc = currentAccountRepo.findAll();
        CurrentAccount found=  AllAcc.stream().filter(acc-> Objects.equals(acc.getAccountNumber(), AccountNumber)).findFirst().orElse(null);
        System.out.println(found+"   "+ AccountNumber);
        return  found;
    }


    public CurrentAccount DeleteByUserId(String userId) {
         CurrentAccount currentAccount = currentAccountRepo.findById(userId).orElse(null);

        if(currentAccount!=null){
            currentAccountRepo.deleteById(userId);

        }
        return currentAccount;
    }

    public CurrentAccount UpdateAccount(CurrentAccount update) {
          String id = update.getUserId();
            CurrentAccount currentAccount = currentAccountRepo.findById(id).orElse(null);
            if (currentAccount!=null){
                currentAccountRepo.save(update);
                return currentAccountRepo.findById(id).orElse(null);
            }
            return  currentAccount;
    }

    public CurrentAccount saveAcc(CurrentAccount ca) {
        CurrentAccount found = currentAccountRepo.findById(ca.getUserId()).orElse(null);
        if(found!=null){
            return  null;
        }
        return  currentAccountRepo.save(ca);
    }

    public CurrentAccount UpdateBalance(float bal, String userId) {
        CurrentAccount currentAccount = currentAccountRepo.findById(userId).orElse(null);
        if(currentAccount!=null){
            currentAccount.setBalance(bal);
            currentAccountRepo.save(currentAccount);
            CurrentAccount updated = currentAccountRepo.findById(userId).orElse(null);
            return updated;
        }
        return null;
    }
}
