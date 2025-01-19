package com.univate.univate01.model.Course;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class HoursPerWeek {
    private int lecture;
    private int lab_tutes;
}