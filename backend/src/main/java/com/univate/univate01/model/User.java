package com.univate.univate01.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Document(collection = "users") // This maps to the "users" collection in MongoDB
@Data
@AllArgsConstructor
@NoArgsConstructor
public class User {

    @Id
    private String id; // MongoDB uses a unique identifier for each document

    private String username;
    private String email;
    private String password;

    public User orElse(User other) {
        return this != null ? this : other;
    }
}
