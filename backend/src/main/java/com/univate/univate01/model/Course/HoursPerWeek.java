package com.univate.univate01.model.Course;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class HoursPerWeek {

    @JsonProperty("lecture")
    private int lecture;

    @JsonProperty("lab_tutes")
    private int lab_tutes;
}