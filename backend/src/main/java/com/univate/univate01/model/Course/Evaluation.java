package com.univate.univate01.model.Course;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Evaluation {

    @JsonProperty("CA")
    private double CA;
    
    @JsonProperty("WE")
    private double WE; // Written Exam
}