package com.univate.univate01.model.Course;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Content {

    @JsonProperty("topic")
    private String topic;

    @JsonProperty("subtopics")
    private List<String> subtopics;
}
