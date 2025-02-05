package com.univate.univate01.service;

import java.io.IOException;
import java.security.GeneralSecurityException;
import java.util.Collections;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.jackson2.JacksonFactory;

@Service
public class GoogleAuthService {

    @Value("${spring.security.oauth2.client.registration.google.client-id}")
    private String googleClientId;

    public GoogleToken verify(String credential) throws GeneralSecurityException, IOException {
        GoogleIdTokenVerifier verifier = new GoogleIdTokenVerifier.Builder(
                new NetHttpTransport(),
                JacksonFactory.getDefaultInstance())
                .setAudience(Collections.singletonList(googleClientId))
                .build();

        GoogleIdToken idToken = verifier.verify(credential);
        if (idToken != null) {
            GoogleIdToken.Payload payload = idToken.getPayload();
            System.out.println();
            System.out.println("================================");
            System.out.println("================================");
            System.out.println("================================");
            System.out.println("================================");
            System.out.println("================================");
            System.out.println(payload);
            return new GoogleToken(
                    payload.getSubject(),
                    payload.getEmail(),
                    payload.get("name").toString(),
                    payload.get("picture").toString()
            );
        }
        return null;
    }

    public record GoogleToken(String providerId, String email, String name, String imageUrl) {}
}