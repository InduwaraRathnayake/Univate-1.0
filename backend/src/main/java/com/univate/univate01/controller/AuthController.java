package com.univate.univate01.controller;

import com.univate.univate01.model.User;
import com.univate.univate01.repository.UserRepository;
import com.univate.univate01.util.JwtHelper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtHelper jwtHelper;

    @PostMapping("/register")
    public String registerUser(@RequestBody User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword())); // Hash password
        userRepository.save(user);
        return "User registered successfully!";
    }

    @PostMapping("/login")
    public String authenticateUser(@RequestBody User user) {
        User existingUser = userRepository.findByUsername(user.getUsername())
                .orElseThrow(() -> new RuntimeException("Invalid username or password"));

        if (passwordEncoder.matches(user.getPassword(), existingUser.getPassword())) {
            // Generate and return JWT token
            return jwtHelper.generateToken(existingUser);
        } else {
            throw new RuntimeException("Invalid username or password");
        }
    }
}
