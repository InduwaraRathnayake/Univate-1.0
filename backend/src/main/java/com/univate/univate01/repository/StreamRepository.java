package com.univate.univate01.repository;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.univate.univate01.model.Stream.Stream;

@Repository
public interface StreamRepository extends MongoRepository<Stream, String> {
    Optional<Stream> findByCode(int code);
}
