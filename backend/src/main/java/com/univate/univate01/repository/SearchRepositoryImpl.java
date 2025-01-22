package com.univate.univate01.repository;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import org.bson.Document;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.convert.MongoConverter;
import org.springframework.stereotype.Component;

import com.mongodb.client.AggregateIterable;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import com.univate.univate01.model.Course.Course;

import lombok.NoArgsConstructor;

@Component
@NoArgsConstructor
public class SearchRepositoryImpl implements SearchRepository {

    @Autowired
    MongoClient mongoClient;

    @Autowired
    MongoConverter mongoConverter;

    @Override
    public List<Course> findByText(String text) {

        List<Course> courses = new ArrayList<>();

        MongoDatabase database = mongoClient.getDatabase("Univate01");
        MongoCollection<Document> collection = database.getCollection("modules");
        AggregateIterable<Document> result = collection.aggregate(Arrays.asList(new Document("$search",
                new Document("text",
                        new Document("query", text)
                                .append("path",
                                        Arrays.asList("moduleTitle", "moduleCode", "compulsoryOrElective", "intake",
                                                "syllabusOutline", "learningOutcomes")))),
                new Document("$sort",
                        new Document("semester", 1L))));

        result.forEach(doc -> courses.add(mongoConverter.read(Course.class, doc)));

        return courses;
    }

    @Override
    public List<Course> findBySemester(int semester) {
        
        List<Course> courses = new ArrayList<>();

        MongoDatabase database = mongoClient.getDatabase("Univate01");
        MongoCollection<Document> collection = database.getCollection("modules");
        AggregateIterable<Document> result = collection.aggregate(Arrays.asList(new Document("$search",
                new Document("index", "default")
                        .append("range",
                                new Document("path", "semester")
                                        .append("gte", semester)
                                        .append("lte", semester)))));
        
    result.forEach(doc -> {
        courses.add(mongoConverter.read(Course.class, doc));
    }); 
    return courses;
    }

}
