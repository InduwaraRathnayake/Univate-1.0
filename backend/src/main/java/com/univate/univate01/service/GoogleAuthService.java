package com.univate.univate01.service;

import java.io.IOException;
import java.security.GeneralSecurityException;
import java.util.Collections;

import org.springframework.stereotype.Service;

import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.jackson2.JacksonFactory;

@Service
public class GoogleAuthService {

    public GoogleToken verify(String credential) throws GeneralSecurityException, IOException {
        GoogleIdTokenVerifier verifier = new GoogleIdTokenVerifier.Builder(
                new NetHttpTransport(),
                JacksonFactory.getDefaultInstance())
                .setAudience(Collections.singletonList("453733820138-s7krehi0k2gt3tvv20mp9qkjetpnki9e.apps.googleusercontent.com"))
                .build();
    
        GoogleIdToken idToken = verifier.verify(credential);
        
        if (idToken == null) {
            System.out.println("Google Token verification failed!"); // Debugging
            throw new GeneralSecurityException("Invalid ID token.");
        }
    
        GoogleIdToken.Payload payload = idToken.getPayload();
        System.out.println("Google Token Payload: " + payload); // Print debug info
    
        return new GoogleToken(
                payload.getSubject(),
                payload.getEmail(),
                payload.get("name").toString(),
                payload.get("picture").toString(),
                payload.get("given_name").toString(),
                payload.get("family_name").toString()
        );
    }
    

    public record GoogleToken(String providerId, String email, String name, String imageUrl, String firstName, String lastName ) {}
}