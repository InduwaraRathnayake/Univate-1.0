package com.univate.univate01.repository;

import com.univate.univate01.model.User;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends MongoRepository<User, String> {
    // Add custom query methods if needed
    Optional<User> findByUsername(String username); // Fetch user by username

    Optional<User> findByEmail(String email); // Fetch user by email
}
