package com.project.User;

import com.project.User.Model.User;
import com.project.User.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public class UserUserDetailsService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String custId) throws UsernameNotFoundException {
//        System.out.println("Hello Mahesh");
        User user = userRepository.findByCustId(custId);
//        System.out.println("This is User: "+user);

        if (user == null) {
            throw new UsernameNotFoundException("User not found with custId: " + custId);
        }

        return new org.springframework.security.core.userdetails.User(
                user.getCustId(),
                user.getPasswordHash(),
                new ArrayList<>()
        );
    }
}

