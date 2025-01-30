package com.univate.univate01.service;

import com.univate.univate01.model.User;
import com.univate.univate01.repository.UserRepository;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import com.univate.univate01.util.JwtHelper;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;


    @Autowired
    private JwtHelper jwtHelper;
    @Autowired
    private PasswordEncoder passwordEncoder;


    public User saveUser(User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }

    public User findByUsername(String username) {
        return userRepository.findByUsername(username).orElse(null);
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public User getUserById(String id) {
        return userRepository.findById(id).orElse(null);
    }

     

    public Map<String, Object> loginUser(String username, String password) {
        User user = userRepository.findByUsername(username).orElse(null);
    
        if (user != null && passwordEncoder.matches(password, user.getPassword())) {
            // Generate JWT Token
            String token = jwtHelper.generateToken(user);
    
            // Construct response payload
            return Map.of(
                    "message", "Login successful!",
                    "token", token,
                    "user", Map.of(
                            "id", user.getId(),
                            "username", user.getUsername(),
                            "email", user.getEmail()
                    )
            );
        }
    
        return Map.of("message", "Invalid username or password");
    }
    
}
