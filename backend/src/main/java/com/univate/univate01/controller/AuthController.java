package com.univate.univate01.controller;

// import com.univate.univate01.service.GoogleAuthService;
import com.univate.univate01.service.UserService;
import com.univate.univate01.dto.RegisterRequest;
//import com.univate.univate01.model.User;
import com.univate.univate01.dto.LoginRequest;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
// import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.web.bind.annotation.*;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin
public class AuthController {

    private static final Logger log = LoggerFactory.getLogger(AuthController.class);

    @Autowired
    private UserService userService;

    

    @PostMapping("/register")
    public ResponseEntity<Map<String, String>> registerUser(@RequestBody RegisterRequest request) {
        try {
            userService.registerUser(request);
            return ResponseEntity.ok(Map.of("message", "User registered successfully!"));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(Map.of("message", e.getMessage()));
        }
    }

    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> authenticateUser(@RequestBody LoginRequest request) {
        try {
            log.info("Login attempt for email: {}", request.getEmail());

            Map<String, Object> response = userService.loginUser(request.getEmail(), request.getPassword());

            return ResponseEntity.status(HttpStatus.ACCEPTED).body(response);

        } catch (Exception e) {
            log.error("Login error for email: " + request.getEmail(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("message", "An error occurred during login"));
        }

    }

    @PostMapping("/oauth/google")
    public ResponseEntity<?> googleLogin(@RequestBody Map<String, String> request) {
        try {
            String credential = request.get("credential");
            System.out.println("Received credential: " + credential); // Debugging
            
            Map<String, Object> response = userService.handleGoogleLogin(credential);
            System.out.println("Response: before send :  " + response); // Debugging
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of(
                "message", "Google login failed",
                "error", e.getMessage()
            ));
        }
    }
}
