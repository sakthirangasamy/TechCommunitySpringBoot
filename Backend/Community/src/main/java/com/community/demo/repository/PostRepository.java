package com.community.demo.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import com.community.demo.entity.Post;

public interface PostRepository extends MongoRepository<Post, String> {


    @Query("{'communityId': {$regex : ?0, $options: 'i'}}") // Case-insensitive
    List<Post> findByCommunityId(String communityId);
    
    
    
}
