package com.natwest.backend.controllers;

import com.natwest.backend.model.CurrentAccount;
import com.natwest.backend.model.SavingAccount;
import com.natwest.backend.services.CurrentAccService;
import com.natwest.backend.services.SavingAccService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import javax.ws.rs.Path;
import java.util.List;
@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/accounts")
public class Controller {
@Autowired
    CurrentAccService currentAccService;
@Autowired
    SavingAccService savingAccService;


@PostMapping("/postCurrent")
    public ResponseEntity<CurrentAccount> PostCurrentAccount(@RequestBody CurrentAccount ca){
     CurrentAccount currentAccount = currentAccService.saveAcc(ca);
    if(currentAccount==null){
        return  new ResponseEntity<>(HttpStatus.CONFLICT);
    }
    return new ResponseEntity<>(currentAccount, HttpStatus.OK);
}
@PostMapping("/postSaving")
public  ResponseEntity<SavingAccount> PostSavingAcc(@RequestBody SavingAccount sa){
    SavingAccount savingAccount = savingAccService.SaveAcc(sa);
    if(savingAccount==null){
        return  new ResponseEntity<>(HttpStatus.CONFLICT);
    }
    return new ResponseEntity<>(savingAccount, HttpStatus.OK);
}

@GetMapping("/getCurrrent/userId/{userId}")
    public ResponseEntity<CurrentAccount> GetCurrentAccountsByUserId(@PathVariable String userId){
       CurrentAccount currentAccount= currentAccService.FindAccountByUserId(userId);
      return  new ResponseEntity<>(currentAccount, HttpStatus.OK);

    }

@GetMapping("/getSaving/userId/{userId}")
public ResponseEntity<SavingAccount> GetSavingAccountsByUserId(@PathVariable String userId){
   SavingAccount savingAccount = savingAccService.FindAccountByUserId(userId);
    return  new ResponseEntity<>(savingAccount, HttpStatus.OK);
}
@GetMapping("/getSaving/custId/{custId}")
public ResponseEntity<SavingAccount> GetSavingAccountsByCustId(@PathVariable String  custId){
    SavingAccount savingAccount = savingAccService.FindAccountByCustId(custId);
    return  new ResponseEntity<>(savingAccount, HttpStatus.OK);
}
    @GetMapping("/getCurrent/custId/{custId}")
    public ResponseEntity<CurrentAccount> GetCurrentAccountsByCustId(@PathVariable String custId){
        CurrentAccount currentAccount =currentAccService.FindAccountByCustId(custId);
        return  new ResponseEntity<>(currentAccount, HttpStatus.OK);
    }
    @GetMapping("/getCurrent/account/{accountNumber}")
    public ResponseEntity<CurrentAccount> GetCurrentAccountByAccountNumber(@PathVariable Long accountNumber){
        CurrentAccount currentAccount =currentAccService.FindAccountByAccountNumber(accountNumber);
        return  new ResponseEntity<>(currentAccount, HttpStatus.OK);
    }
    @GetMapping("/getSaving/account/{accountNumber}")
    public ResponseEntity<SavingAccount> GetSavingAccountByAccountNumber(@PathVariable Long accountNumber){
        SavingAccount savingAccount =savingAccService.FindAccountByAccountNumber(accountNumber);
        return  new ResponseEntity<>(savingAccount, HttpStatus.OK);
    }



    @DeleteMapping("/deleteCurrent/userId/{userid}")
    public ResponseEntity<CurrentAccount> DeleteCurrentByUser(@PathVariable String userid){
    CurrentAccount currentAccount = currentAccService.DeleteByUserId(userid);
    return  new ResponseEntity<>(currentAccount,HttpStatus.OK);
    }
    @DeleteMapping("/deleteSaving/userId/{userid}")
    public ResponseEntity<SavingAccount> DeleteSavingByUser(@PathVariable String userid){
      SavingAccount savingAccount = savingAccService.DeleteByUserId(userid);
        return  new ResponseEntity<>(savingAccount,HttpStatus.OK);
    }
    @PutMapping("/updateCurrent")
    public ResponseEntity<CurrentAccount> UpdateCurrentByUser(@RequestBody CurrentAccount update){
    CurrentAccount currentAccount1= currentAccService.UpdateAccount(update);
    if(currentAccount1==null){
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
    return new ResponseEntity<>(currentAccount1,HttpStatus.OK);
    }
    @PutMapping("/updateSaving")
    public ResponseEntity<SavingAccount> UpdateSaving(@RequestBody SavingAccount update){
    SavingAccount savingAccount = savingAccService.UpdateAccount(update);
    if(savingAccount==null){
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
    return  new ResponseEntity<>(savingAccount,HttpStatus.OK);
    }
    @PutMapping("/updateCurrentBalance/{userid}/{bal}")
    public ResponseEntity<CurrentAccount> UpdateCurrentBalance(@PathVariable float bal,@PathVariable String userid){
    CurrentAccount updated = currentAccService.UpdateBalance(bal,userid);

        if(updated==null){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    return new ResponseEntity<>(updated,HttpStatus.OK);
    }
    @PutMapping("/updateSavingBalance/{userid}/{bal}")
    public ResponseEntity<SavingAccount> UpdatSavingBalance(@PathVariable float bal,@PathVariable String userid){
       SavingAccount updated = savingAccService.UpdateBalance(bal,userid);
      if(updated==null){
          return new ResponseEntity<>(HttpStatus.NOT_FOUND);
      }
        return new ResponseEntity<>(updated,HttpStatus.OK);
    }
    @PutMapping("/updateCurrentBalance/userId/{userId}")
    public ResponseEntity<CurrentAccount> updateCurrentBalanceByUserId(
            @PathVariable String userId,
            @RequestParam float newBalance) {
        CurrentAccount currentAccount = currentAccService.FindAccountByUserId(userId);

        if (currentAccount == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND); // User not found
        }

        // Update the balance
        currentAccount.setBalance(newBalance);

        // Save the updated account
        CurrentAccount updatedAccount = currentAccService.UpdateAccount(currentAccount);

        return new ResponseEntity<>(updatedAccount, HttpStatus.OK);
    }
    @PutMapping("/updateSavingBalance/userId/{userId}")
    public ResponseEntity<SavingAccount> updateSavingBalanceByUserId(
            @PathVariable String userId,
            @RequestParam float newBalance) {
        SavingAccount savingAccount = savingAccService.FindAccountByUserId(userId);

        if (savingAccount == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND); // User not found
        }

        // Update the balance
        savingAccount.setBalance(newBalance);

        // Save the updated account
        SavingAccount updatedAccount = savingAccService.UpdateAccount(savingAccount);

        return new ResponseEntity<>(updatedAccount, HttpStatus.OK);
    }

    private final RestTemplate restTemplate;

    public Controller(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }
    @GetMapping("/transferBetweenAccountsSTC/{savingAccount}/{amount}/{currentAccount}")
    public ResponseEntity<String> transferBetweenAccountsFromSavingToCurrent(
            @PathVariable Long savingAccount,
            @PathVariable float amount,
            @PathVariable Long currentAccount) {
        if (amount < 2000) {
            return ResponseEntity.badRequest().body("Transfer amount should be atleast 2000.");
        }

        // Retrieve the savings account balance
        ResponseEntity<SavingAccount> savingAccountResponse = restTemplate.getForEntity(
                "http://localhost:8040/getSaving/account/" + savingAccount, SavingAccount.class);

        if (savingAccountResponse.getStatusCode().is2xxSuccessful()) {
            SavingAccount savingAccountorg = savingAccountResponse.getBody();

            if (savingAccountorg != null && savingAccountorg.getBalance() >= amount) {
                // Reduce the amount from the savings account balance
                savingAccountorg.setBalance(savingAccountorg.getBalance() - amount);
                restTemplate.put(
                        "http://localhost:8040/updateSavingBalance/userId/" + savingAccountorg.getUserId() +
                                "?newBalance=" + savingAccountorg.getBalance(), null);

                // Retrieve the current account balance
                ResponseEntity<CurrentAccount> currentAccountResponse = restTemplate.getForEntity(
                        "http://localhost:8040/getCurrent/account/" + currentAccount, CurrentAccount.class);

                if (currentAccountResponse.getStatusCode().is2xxSuccessful()) {
                    CurrentAccount currentAccountorg = currentAccountResponse.getBody();

                    if (currentAccountorg != null) {
                        // Add the amount to the current account balance
                        currentAccountorg.setBalance(currentAccountorg.getBalance() + amount);
                        restTemplate.put(
                                "http://localhost:8040/updateCurrentBalance/userId/" + currentAccountorg.getUserId() +
                                        "?newBalance=" + currentAccountorg.getBalance(), null);

                        return ResponseEntity.ok("Transfer successful");
                    }
                }
            }
        }

        return ResponseEntity.badRequest().body("Transfer failed");
    }
    @GetMapping("/transferBetweenAccountsCTS/{currentAccount}/{amount}/{savingAccount}")
    public ResponseEntity<String> transferBetweenAccountsFromCurrentToSaving(
            @PathVariable Long savingAccount,
            @PathVariable float amount,
            @PathVariable Long currentAccount) {
//        if (amount < 2000) {
//            return ResponseEntity.badRequest().body("Transfer amount should be atleast 2000.");
//        }

        // Retrieve the current account balance
        ResponseEntity<CurrentAccount> currentAccountResponse = restTemplate.getForEntity(
                "http://localhost:8040/getCurrent/account/" + currentAccount, CurrentAccount.class);

        if (currentAccountResponse.getStatusCode().is2xxSuccessful()) {
            CurrentAccount currentAccountorg = currentAccountResponse.getBody();

            if (currentAccountorg != null && currentAccountorg.getBalance() >= amount) {
                // Reduce the amount from the savings account balance
                currentAccountorg.setBalance(currentAccountorg.getBalance() - amount);
                restTemplate.put(
                        "http://localhost:8040/updateCurrentBalance/userId/" + currentAccountorg.getUserId() +
                                "?newBalance=" + currentAccountorg.getBalance(), null);

                // Retrieve the saving account balance
                ResponseEntity<SavingAccount> savingAccountResponse = restTemplate.getForEntity(
                        "http://localhost:8040/getSaving/account/" + savingAccount, SavingAccount.class);

                if (savingAccountResponse.getStatusCode().is2xxSuccessful()) {
                    SavingAccount savingAccountorg = savingAccountResponse.getBody();

                    if (savingAccountorg != null) {
                        // Add the amount to the current account balance
                        savingAccountorg.setBalance(savingAccountorg.getBalance() + amount);
                        restTemplate.put(
                                "http://localhost:8040/updateSavingBalance/userId/" + savingAccountorg.getUserId() +
                                        "?newBalance=" + savingAccountorg.getBalance(), null);

                        return ResponseEntity.ok("Transfer successful");
                    }
                }
            }
        }


        return ResponseEntity.badRequest().body("Transfer failed");
    }
    @PutMapping("/addAmountToCurrentAccount/{accountNumber}/{amountToAdd}")
    public ResponseEntity<CurrentAccount> addAmountToCurrentAccount(
            @PathVariable Long accountNumber,
            @PathVariable float amountToAdd) {

        // Find the current account by account number
        CurrentAccount currentAccount = currentAccService.FindAccountByAccountNumber(accountNumber);

        if (currentAccount == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND); // Account not found
        }

        // Update the balance by adding the provided amount
        float currentBalance = currentAccount.getBalance();
        float newBalance = currentBalance + amountToAdd;
        currentAccount.setBalance(newBalance);

        // Save the updated account
        CurrentAccount updatedAccount = currentAccService.UpdateAccount(currentAccount);

        return new ResponseEntity<>(updatedAccount, HttpStatus.OK);
    }

    @PutMapping("/addAmountToSavingAccount/{accountNumber}/{amountToAdd}")
    public ResponseEntity<SavingAccount> addAmountToSavingAccount(
            @PathVariable Long accountNumber,
            @PathVariable float amountToAdd) {

        // Find the current account by account number
        SavingAccount savingAccount = savingAccService.FindAccountByAccountNumber(accountNumber);

        if (savingAccount == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND); // Account not found
        }

        // Update the balance by adding the provided amount
        float savingBalance = savingAccount.getBalance();
        float newBalance = savingBalance + amountToAdd;
        savingAccount.setBalance(newBalance);

        // Save the updated account
        SavingAccount updatedAccount = savingAccService.UpdateAccount(savingAccount);

        return new ResponseEntity<>(updatedAccount, HttpStatus.OK);
    }
    @GetMapping("/withdrawl/{currentAccount}/{amount}/{savingAccount}")
    public String transferBetweenAccountsFromCurrentToSaving1(
            @PathVariable Long savingAccount,
            @PathVariable float amount,
            @PathVariable Long currentAccount){
        CurrentAccount currentAccount1= currentAccService.FindAccountByAccountNumber(currentAccount);
        SavingAccount savingAccount1=savingAccService.FindAccountByAccountNumber(savingAccount);
        if(currentAccount1.getBalance()>amount && amount>0){
            float x=currentAccount1.getBalance()-amount;
            float y=savingAccount1.getBalance()+amount;
            currentAccService.UpdateBalance(x,currentAccount1.getUserId());
            savingAccService.UpdateBalance(y,savingAccount1.getUserId());
            return "done..";
        }else{
            float x=currentAccount1.getBalance();
            float y=savingAccount1.getBalance();
            currentAccService.UpdateBalance(x,currentAccount1.getUserId());
            savingAccService.UpdateBalance(y,savingAccount1.getUserId());
            return "none..";
        }

    }
    @GetMapping("/withdrawlSTC/{savingAccount}/{amount}/{currentAccount}")
    public String transferBetweenAccountsFromSavingToCurrent1(
            @PathVariable Long savingAccount,
            @PathVariable float amount,
            @PathVariable Long currentAccount){
        CurrentAccount currentAccount1= currentAccService.FindAccountByAccountNumber(currentAccount);
        SavingAccount savingAccount1=savingAccService.FindAccountByAccountNumber(savingAccount);
        if (savingAccount1.getBalance()>amount && amount>0) {
            float x = currentAccount1.getBalance() + amount;
            float y = savingAccount1.getBalance() - amount;
            currentAccService.UpdateBalance(x, currentAccount1.getUserId());
            savingAccService.UpdateBalance(y, savingAccount1.getUserId());
            return "done..";
        }else{
            float x = currentAccount1.getBalance() ;
            float y = savingAccount1.getBalance() ;
            currentAccService.UpdateBalance(x, currentAccount1.getUserId());
            savingAccService.UpdateBalance(y, savingAccount1.getUserId());
            return "None....";
        }

    }
}
