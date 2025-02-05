package com.univate.univate01.service;

import com.univate.univate01.model.User;
import com.univate.univate01.repository.UserRepository;
import com.univate.univate01.dto.RegisterRequest;

import java.security.GeneralSecurityException;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import com.univate.univate01.util.JwtHelper;

import java.io.IOException;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

@Service
public class UserService implements UserDetailsService {

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

    public void registerUser(RegisterRequest request) {
        // Check if user already exists
        if (userRepository.findByUsername(request.getUsername()).isPresent()) {
            throw new IllegalArgumentException("Username already exists!");
        }

        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new IllegalArgumentException("Email already exists!");
        }
        User user = new User();

        user.setUsername(request.getUsername());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setFirstName(request.getFirstName());
        user.setLastName(request.getLastName());
        user.setRoles(List.of("Student"));

        userRepository.save(user);
    }

    public Map<String, Object> loginUser(String email, String password) {
        // Debug log
        System.out.println("Attempting login with email: " + email);

        // Find user by email
        User user = userRepository.findByEmail(email).orElse(null);

        // Debug log
        System.out.println("Found user: " + user);

        if (user == null) {
            return Map.of("message", "User not found");
        }

        if (passwordEncoder.matches(password, user.getPassword())) {
            String token = jwtHelper.generateToken(user);

            return Map.of(
                    "message", "Login successful!",
                    "token", token,
                    "user", Map.of(
                            "email", user.getEmail(),
                            "username", user.getUsername(),
                            "firstName", user.getFirstName(),
                            "lastName", user.getLastName()));
        }

        return Map.of("message", "Invalid username or password");

    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        // Fetch the user from the database
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with username: " + username));

        // Convert the User entity into a Spring Security UserDetails object
        return org.springframework.security.core.userdetails.User
                .withUsername(user.getUsername())
                .password(user.getPassword()) // Password should already be hashed
                .authorities(user.getRoles().toArray(new String[0])) // Roles assigned to the user
                .accountExpired(false)
                .accountLocked(false)
                .credentialsExpired(false)
                .disabled(false)
                .build();
    }

    public void googleSignup(OAuth2AuthenticationToken authToken) {
        OAuth2User oauthUser = authToken.getPrincipal();

        // Extract Google user details
        String email = oauthUser.getAttribute("email");
        String picture = oauthUser.getAttribute("picture");
        String givenName = oauthUser.getAttribute("given_name"); // First name
        String familyName = oauthUser.getAttribute("family_name"); // Last name

        // Check if user already exists
        if (userRepository.findByEmail(email).isPresent()) {
            throw new IllegalArgumentException("User already exists! Please login.");
        }

        // Register the new user
        User user = new User();
        user.setEmail(email);
        user.setUsername(email); // Use email as username
        user.setFirstName(givenName);
        user.setLastName(familyName);
        user.setProfilePicture(picture);
        user.setRoles(List.of("Student"));

        userRepository.save(user);

    }

    public Map<String, Object> googleLogin(OAuth2AuthenticationToken authToken) {
        OAuth2User oauthUser = authToken.getPrincipal();
    
        // Extract Google user details
        String email = oauthUser.getAttribute("email");
    
        // Find user in DB
        User user = userRepository.findByEmail(email).orElse(null);
    
        if (user == null) {
            return Map.of("message", "User not found. Please sign up.");
        }
    
        // Generate JWT token
        String token = jwtHelper.generateToken(user);
    
        return Map.of(
                "message", "Login successful!",
                "token", token,
                "user", Map.of(
                        "email", user.getEmail(),
                        "username", user.getUsername(),
                        "firstName", user.getFirstName(),
                        "lastName", user.getLastName()
                )
        );
    }




    @Autowired
    private GoogleAuthService googleAuthService;

    public Map<String, Object> handleGoogleLogin(String credential) throws GeneralSecurityException, java.io.IOException {
        // Verify Google token
        GoogleAuthService.GoogleToken googleToken = googleAuthService.verify(credential);

        // Find or create user
        User user = findOrCreateUser(googleToken);

        // Generate JWT
        String token = jwtHelper.generateToken(user);

        // Return response
        return Map.of(
                "token", token,
                "user", user
        );
    }

    private User findOrCreateUser(GoogleAuthService.GoogleToken googleToken) {
        return userRepository.findByEmail(googleToken.email())
                .orElseGet(() -> createNewUser(googleToken));
    }

    private User createNewUser(GoogleAuthService.GoogleToken googleToken) {
        User newUser = new User();
        System.out.println();
        System.out.println("Creating new user: \n\n\n\n\n" + googleToken);
        newUser.setEmail(googleToken.email());
        newUser.setUsername(googleToken.email()); // or use name
        newUser.setProvider("google");
        newUser.setProviderId(googleToken.providerId());
        newUser.setImageUrl(googleToken.imageUrl());

        return userRepository.save(newUser);
    }
    

}
