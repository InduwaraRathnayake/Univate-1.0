package com.univate.univate01.repository;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.univate.univate01.model.Course.Course;

@Repository
public interface SearchRepository {
    
    List<Course> findByText(String text);
}
