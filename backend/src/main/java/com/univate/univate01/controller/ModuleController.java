package com.univate.univate01.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.univate.univate01.model.Course.Course;
import com.univate.univate01.service.ModuleService;

@RestController
@RequestMapping("/api")
public class ModuleController {

    @Autowired
    private ModuleService moduleService;

    @GetMapping("/module")
    public List<Course> getModule() {
        return moduleService.getAllModules();
    }
    
}
