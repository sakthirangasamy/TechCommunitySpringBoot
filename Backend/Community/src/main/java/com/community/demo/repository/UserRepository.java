package com.community.demo.repository;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.community.demo.entity.User;

@Repository
public interface UserRepository extends MongoRepository<User, String> {
    
    // Check if username exists
    Boolean existsByUsername(String username);
    
    // Check if email exists
    Boolean existsByEmail(String email);
    
    // Find user by username (for login)
    Optional<User> findByUsername(String username);
    
    // Find user by email (optional)
    Optional<User> findByEmail(String email);
    
    // Custom query example (if needed)
    // @Query("{ 'username' : ?0, 'email' : ?1 }")
    // Optional<User> findByUsernameAndEmail(String username, String email);
}