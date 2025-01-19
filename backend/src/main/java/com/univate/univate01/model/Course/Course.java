package com.univate.univate01.model.Course;

import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Document(collection = "modules")
@AllArgsConstructor
@NoArgsConstructor
@Data
public class Course {

    @Id
    private String moduleCode; // Primary Key

    private String moduleTitle;
    private List<Integer> semester; // Can be multiple
    private String intake;
    private String compulsoryOrElective;
    private String gpaOrNgpa;
    private int credits;

    private List<String> syllabusOutlines; // Can be multiple
    private List<String> prerequisitesOrCorequisites;
    private List<String> learningOutcomes;

    private HoursPerWeek hoursPerWeek;
    private Evaluation evaluation;
}
