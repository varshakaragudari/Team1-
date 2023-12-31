package com.project.User.Controller;

import com.project.User.Model.*;
import com.project.User.Repository.UserRepository;
import com.project.User.Service.UserService;
import com.project.User.Util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.sql.Timestamp;
import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/users")
//@CrossOrigin(origins = "http://localhost:3000")
@CrossOrigin(origins = { "*" })
public class UserController {

    @Autowired
    private JwtUtil jwtUtil;
    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    UserService userService;


    private long generateAccountNumber() {
        long min = 10000000000000L; // Minimum 14-digit number (10^15)
        long max = 99999999999999L; // Maximum 14-digit number (10^16 - 1)

        // Generate a random number within the specified range
        long accountNumber = min + (long) (Math.random() * (max - min + 1));

        return accountNumber;
    }
    private long generateCardNumber() {
        long minPrefix2 = 2000000000000000L; // Minimum 16-digit number that starts with 2 (2 * 10^15)
        long maxPrefix2 = 2999999999999999L; // Maximum 16-digit number that starts with 2 (2 * 10^15 + 10^15 - 1)
        long minPrefix4 = 4000000000000000L; // Minimum 16-digit number that starts with 4 (4 * 10^15)
        long maxPrefix4 = 4999999999999999L; // Maximum 16-digit number that starts with 4 (4 * 10^15 + 10^15 - 1)

        // Generate a random number within the specified range
        long cardNumber;
        if (Math.random() < 0.5) {
            // 50% chance of generating a number starting with 2
            cardNumber = minPrefix2 + (long) (Math.random() * (maxPrefix2 - minPrefix2 + 1));
        } else {
            // 50% chance of generating a number starting with 4
            cardNumber = minPrefix4 + (long) (Math.random() * (maxPrefix4 - minPrefix4 + 1));
        }

        return cardNumber;
    }
    private String generateExpiry() {
        // Generate expiry date in MM/YY format (e.g., 12/23)
        Calendar calendar = Calendar.getInstance();
        calendar.add(Calendar.YEAR, 10); // Add 10 years
        int year = calendar.get(Calendar.YEAR) % 100; // Get last two digits of the year
        int month = calendar.get(Calendar.MONTH) + 1; // Month is zero-based, so add 1
        return String.format("%02d/%02d", month, year);
    }
    private int generateCVV() {
        // Generate a 3-digit CVV
        // This is just a placeholder
        int min = 100;
        int max = 999;

        return min + (int) (Math.random() * (max - min + 1));
    }

    @PostMapping("/api/users/register")
    public ResponseEntity<?> createUser(@RequestBody User user) {
        try {
            // Log the user object to check if it's received correctly
            System.out.println("Received user object: " + user.toString());

            // Generate a unique userId (you can use UUID.randomUUID())
            String userId = UUID.randomUUID().toString();
            user.setUserId(userId);

            // Generate custId as firstName + DOB
            user.setCustId(user.getFirstName() + user.getDob());

            // Create two Account entries (Savings and Current)
            List<Account> accounts = new ArrayList<>();

            // Generate accountNumber (12-digit autogenerated value)
            // Set accountBalance to zero
            // Set lastUpdate to the current date and time
            long savingsAccountNumber = generateAccountNumber();
            long currentAccountNumber = generateAccountNumber();
//
            Account savingsAccount = new Account("Savings", savingsAccountNumber, 0.0f, String.valueOf(System.currentTimeMillis()));
            Account currentAccount = new Account("Current", currentAccountNumber, 0.0f, String.valueOf(System.currentTimeMillis()));
            accounts.add(savingsAccount);
            accounts.add(currentAccount);
            user.setAccounts(accounts);

            // Create one Card entry (Debit)
            List<Card> cards = new ArrayList<>();

            // Generate accountNumber (autogenerated value)
            // Generate expiry (MM/YY format, based on current month and year + 10 years)
            // Generate cvv (3-digit autogenerated value)
            long debitCardNumber = generateCardNumber();
            String expiry = generateExpiry();
            int cvv = generateCVV();
            Card debitCard = new Card("Debit", debitCardNumber, 0.0f, expiry, cvv);
            cards.add(debitCard);
            user.setCards(cards);

            // Log the user object again after processing
            System.out.println("Processed user object: " + user.toString());

            // Save the user object to MongoDB
            userService.registerUser(user);

            // Create the response object and populate it with the required information
            RegistrationResponse response = new RegistrationResponse();
            response.setMessage("User created successfully");
            response.setCustId(user.getCustId());
            response.setDebitCardNumber(debitCardNumber); // You should have a variable with the debit card number
            response.setExpiry(expiry);
            response.setCvv(cvv);

            // Return the custom response object in the ResponseEntity
            return ResponseEntity.status(HttpStatus.CREATED).body(response);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error creating user");
        }
    }

    @Autowired
    LoginData loginData;
    @Autowired
    PasswordEncoder passwordEncoder;

    public String getCustIdByCardNumber(long cardNumber) {
        List<User> users = userRepository.findAll();
        for (User user : users) {
            List<Card> cards = user.getCards();
            if (cards != null && !cards.isEmpty()) {
                for (Card card : cards) {
                    if (card.getCardNumber() == cardNumber) {
                        // Return the custId associated with the matching cardNumber
                        return user.getCustId();
                    }
                }
            }
        }
        // If no matching cardNumber is found, return null or a suitable default value
        return null;
    }
    @PostMapping("/api/users/login")
    public ResponseEntity<?> loginUser(@RequestBody LoginData loginData) throws Exception {
        try{
            String custId = loginData.getCustId();

            if (custId == null) {
                // If custId is not provided, try to find it by cardNumber
                long cardNumber = loginData.getCardNumber();
                custId = getCustIdByCardNumber(cardNumber);
                loginData.setCustId(custId);

                if (custId == null) {
                    // If custId is still null, return an error
                    return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid Card Number");
                }
            }


            System.out.println(loginData.getCustId()+" --------- "+loginData.getPasswordHash());

            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(loginData.getCustId(), loginData.getPasswordHash())
            );

            // Authentication succeeded, generate and return a JWT token
            String jwtToken = jwtUtil.generateToken(loginData.getCustId());
            User user = userRepository.findByCustId(loginData.getCustId());

            // Create a HashMap to hold the message and token
            Map<String, Object> response = new HashMap<>();
            response.put("message", "Authentication succeeded");
            response.put("token", jwtToken.toString());
            response.put("User", user);

            return ResponseEntity.ok(response);
//            return ResponseEntity.ok(jwtToken);

//            jwtToken.toString();
        } catch(AuthenticationException ex) {
            // Authentication failed, return an error response
//            ex.printStackTrace();
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid UserName Or Password");
        } catch (Exception ex){
            throw new Exception("Invalid UserName/Password");
        }
    }


    @GetMapping("/hello")
    public String hello(){
        return "SHello";
    }

    @Autowired
    private UserRepository userRepository;

    @GetMapping("/getall")
    public List<User> getAll() {
        return userRepository.findAll();
    }

    @GetMapping("/api/users/{id}")
    public ResponseEntity<User> getUserByUserId(@PathVariable String id) {
        User user = userRepository.findByCustId(id);
        return ResponseEntity.ok(user);
    }

//    @PutMapping("/api/users/updatePassword")
//    public ResponseEntity<String> updatePasswordByCustId(@RequestParam String custId, @RequestParam String newPassword) {
//        try {
//            // Retrieve the user by their custId from the MongoDB repository
//            User user = userRepository.findByCustId(custId);
//
//            if (user == null) {
//                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
//            }
//
//            // Update the user's password
//            user.setPasswordHash(newPassword);
//
//            // Save the updated user back to MongoDB
//            userRepository.save(user);
//
//            return ResponseEntity.ok("Password updated successfully");
//        } catch (Exception e) {
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error updating password");
//        }
//    }
@PutMapping("/api/users/updatePassword")    //  For password updating
public ResponseEntity<?> updatePasswordByCustId(@RequestParam String custId, @RequestParam String newPassword) {
    try {
        // Retrieve the user by their custId from the MongoDB repository
        User user = userRepository.findByCustId(custId);

        if (user == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        }

        // Hash the user's password before saving it
        user.setPasswordHash(passwordEncoder.encode(newPassword));

        // Save the updated user back to MongoDB
        userRepository.save(user);

        User user1 = userRepository.findByCustId(custId);

        // Create a HashMap to hold the message and updated user table
        Map<String, Object> response = new HashMap<>();
        response.put("message", "Password updated successfully");
        response.put("User", user1);

        return ResponseEntity.ok(response);
    } catch (Exception e) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error updating password");
    }
}

    @PutMapping("/api/users/updateInfo")
    public ResponseEntity<?> updateUserInfo(@RequestParam String custId,
                                                 @RequestParam(required = false) String firstName,
                                                 @RequestParam(required = false) String lastName,
                                                 @RequestParam(required = false) String address,
                                                 @RequestParam(required = false) String city,
                                                 @RequestParam(required = false) String state,
                                                 @RequestParam(required = false) String country,
                                                 @RequestParam(required = false) String dob,
                                                 @RequestParam(required = false) long phoneNumber,
                                                 @RequestParam(required = false) String email) {
        try {
            // Retrieve the user by their custId from the MongoDB repository
            User user = userRepository.findByCustId(custId);

            if (user == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
            }

            // Update the user information if the fields are provided
            if (firstName != null) {
                user.setFirstName(firstName);
            }
            if (lastName != null) {
                user.setLastName(lastName);
            }
            if (address != null) {
                user.setAddress(address);
            }
            if (city != null) {
                user.setCity(city);
            }
            if (state != null) {
                user.setState(state);
            }
            if (country != null) {
                user.setCountry(country);
            }
            if (dob != null) {
                user.setDob(dob);
            }
            if (phoneNumber != 0) {
                user.setPhoneNumber(phoneNumber);
            }
            if (email != null) {
                user.setEmail(email);
            }

            // Save the updated user back to MongoDB
            userRepository.save(user);

            User user1 = userRepository.findByCustId(custId);

            // Create a HashMap to hold the message and updated user table
            Map<String, Object> response = new HashMap<>();
            response.put("message", "User information updated successfully");
            response.put("User", user1);

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error updating user information");
        }
    }

    @GetMapping("/api/users/getCards")
    public ResponseEntity<List<Card>> getUserCards(@RequestParam String custId) {
        try {
            // Retrieve the user by their custId from the MongoDB repository
            User user = userRepository.findByCustId(custId);

            if (user == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
            }

            // Get the list of cards from the user
            List<Card> cards = user.getCards();

            // Check if the user has any cards
            if (cards == null || cards.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NO_CONTENT).body(null);
            }

            // Return the list of cards
            return ResponseEntity.ok(cards);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @GetMapping("/api/users/getAccounts")
    public ResponseEntity<List<Account>> getUserAccountsByType(
            @RequestParam String custId,
            @RequestParam String accountType
    ) {
        try {
            // Retrieve the user by their custId from the MongoDB repository
            User user = userRepository.findByCustId(custId);

            if (user == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
            }

            // Get the list of accounts from the user
            List<Account> accounts = user.getAccounts();

            // Check if the user has any accounts
            if (accounts == null || accounts.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NO_CONTENT).body(null);
            }

            // Filter the accounts based on the provided accountType
            List<Account> filteredAccounts = accounts.stream()
                    .filter(account -> accountType.equalsIgnoreCase(account.getType()))
                    .collect(Collectors.toList());

            // Check if any matching accounts were found
            if (filteredAccounts.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NO_CONTENT).body(null);
            }

            // Return the filtered list of accounts
            return ResponseEntity.ok(filteredAccounts);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @PutMapping("/api/users/updateAccountBalance")
    public ResponseEntity<?> updateAccountBalance(
            @RequestParam String custId,
            @RequestParam String accountType,
            @RequestParam float newBalance
    ) {
        try {
            // Retrieve the user by their custId from the MongoDB repository
            User user = userRepository.findByCustId(custId);

            if (user == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
            }

            // Get the list of accounts from the user
            List<Account> accounts = user.getAccounts();

            // Check if the user has any accounts
            if (accounts == null || accounts.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NO_CONTENT).body("No accounts found");
            }

            // Find the account with the specified accountType
            Optional<Account> accountToUpdate = accounts.stream()
                    .filter(account -> accountType.equalsIgnoreCase(account.getType()))
                    .findFirst();

            // Check if the account was found
            if (accountToUpdate.isPresent()) {
                // Update the account balance with the newBalance
                Account updatedAccount = accountToUpdate.get();
                updatedAccount.setAccountBalance(newBalance);

                // Save the updated user back to MongoDB
                userRepository.save(user);
                User user1 = userRepository.findByCustId(custId);

                // Create a HashMap to hold the message and updated user table
                Map<String, Object> response = new HashMap<>();
                response.put("message", "Account balance updated successfully");
                response.put("User", user1);

                return ResponseEntity.ok(response);
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Account not found");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error updating account balance");
        }
    }

    @GetMapping("/api/users/checkPhoneNumber")
    public ResponseEntity<Boolean> checkPhoneNumberBelongsToCustId(
            @RequestParam String custId,
            @RequestParam long phoneNumber
    ) {
        try {
            // Retrieve the user by their custId from the MongoDB repository
            User user = userRepository.findByCustId(custId);

            if (user == null) {
                // If the user with the provided custId is not found, return false
                return ResponseEntity.ok(false);
            }

            // Check if the provided phoneNumber matches the user's phoneNumber
            if (user.getPhoneNumber() == phoneNumber) {
                // If they match, return true
                return ResponseEntity.ok(true);
            } else {
                // If they don't match, return false
                return ResponseEntity.ok(false);
            }
        } catch (Exception e) {
            // Handle any exceptions and return false in case of errors
            return ResponseEntity.ok(false);
        }
    }




}
