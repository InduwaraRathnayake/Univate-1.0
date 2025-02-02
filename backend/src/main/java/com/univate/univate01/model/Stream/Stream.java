package com.univate.univate01.model.Stream;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Document(collection = "streams")
@AllArgsConstructor
@NoArgsConstructor
@Data
public class Stream {
    @Id
    private String id;

    @JsonProperty("code")
    private int code;

    @JsonProperty("name")
    private String name;

    @JsonProperty("careers")
    private List<Career> careers;

    @JsonProperty("companies")
    private List<Company> companies;

   
}
