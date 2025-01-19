package com.univate.univate01.model.Course;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class SyllabusOutline {
    
    private String syllabus_outline_desc;
    private List<Content> content;

}
