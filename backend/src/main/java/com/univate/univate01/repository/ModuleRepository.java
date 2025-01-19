package com.univate.univate01.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.univate.univate01.model.Course.Course;

@Repository
public interface ModuleRepository extends MongoRepository<Course, String> {

}
