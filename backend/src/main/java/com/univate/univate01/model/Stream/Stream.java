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

    @JsonProperty("sem1")
    private List<String> sem1;

    @JsonProperty("sem2")
    private List<String> sem2;

    @JsonProperty("sem3")
    private List<String> sem3;

    @JsonProperty("sem4")
    private List<String> sem4;

    @JsonProperty("sem5")
    private List<String> sem5;

    @JsonProperty("sem6")
    private List<String> sem6;

    @JsonProperty("sem7")
    private List<String> sem7;

    @JsonProperty("sem8")
    private List<String> sem8;


   
}
