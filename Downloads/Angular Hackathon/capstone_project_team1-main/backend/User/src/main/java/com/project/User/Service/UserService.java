package com.project.User.Service;

import com.project.User.Model.User;
import com.project.User.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    @Autowired
    UserRepository userRepository;
    @Autowired
    PasswordEncoder passwordEncoder;

    public void registerUser(User user) {
        // Hash the user's password before saving it
        user.setPasswordHash(passwordEncoder.encode(user.getPasswordHash()));
        userRepository.save(user);
    }


}
