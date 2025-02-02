package com.univate.univate01.model.Stream;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Career {

    @JsonProperty("title")
    private String title;
    
    @JsonProperty("description")
    private String description;

   
}
