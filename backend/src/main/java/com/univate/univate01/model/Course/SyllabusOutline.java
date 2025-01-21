package com.univate.univate01.model.Course;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class SyllabusOutline {
    
    @JsonProperty("syllabus_outline_desc")
    private String syllabus_outline_desc;

    @JsonProperty("content")
    private List<Content> content;

}
