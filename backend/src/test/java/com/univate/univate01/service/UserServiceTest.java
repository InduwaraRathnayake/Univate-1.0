package com.univate.univate01.service;

import com.univate.univate01.dto.RegisterRequest;
import com.univate.univate01.repository.UserRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest; 
import static org.junit.jupiter.api.Assertions.*;

import java.util.Map;

@SpringBootTest
class UserServiceTest {

    @Autowired
    private UserService userService;

    @Test
    void testRegisterAndLogin() {
        RegisterRequest registerRequest = new RegisterRequest();
        registerRequest.setEmail("testlogin@example.com");
        registerRequest.setUsername("testlogin");
        registerRequest.setPassword("testpassword");

        userService.registerUser(registerRequest);

        Map<String, Object> result = userService.loginUser(
            "testlogin@example.com",
            "testpassword"
        );

        assertEquals("Login successful!", result.get("message"));
        assertNotNull(result.get("token"));
    }
}
