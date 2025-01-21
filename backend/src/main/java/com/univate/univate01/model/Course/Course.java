package com.univate.univate01.model.Course;

import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Document(collection = "modules")
@AllArgsConstructor
@NoArgsConstructor
@Data
public class Course {

    @Id
    private String id;

    @Field("moduleCode")
    @JsonProperty("moduleCode")
    private String moduleCode;

    @JsonProperty("moduleTitle")
    private String moduleTitle;

    @JsonProperty("semester")
    private List<Integer> semester; 

    @JsonProperty("intake")
    private String intake;

    @JsonProperty("compulsoryOrElective")
    private String compulsoryOrElective;

    @JsonProperty("gpaOrNgpa")
    private String gpaOrNgpa;

    @JsonProperty("credits")
    private int credits;

    @JsonProperty("prerequisitesOrCorequisites")
    private List<String> prerequisitesOrCorequisites;

    @JsonProperty("learningOutcomes")
    private List<String> learningOutcomes;

    @JsonProperty("hoursPerWeek")
    private HoursPerWeek hoursPerWeek;

    @JsonProperty("evaluation")
    private Evaluation evaluation;

    @JsonProperty("syllabusOutline")
    private SyllabusOutline syllabusOutline;
}