package com.univate.univate01.repository;

import com.univate.univate01.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends MongoRepository<User, String> {
    // Add custom query methods if needed
    User findByUsername(String username); // Fetch user by username
}
