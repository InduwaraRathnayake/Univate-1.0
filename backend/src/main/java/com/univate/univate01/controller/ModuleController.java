package com.univate.univate01.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.univate.univate01.model.Course.Course;
import com.univate.univate01.service.ModuleService;

@RestController
@RequestMapping("/api/modules") 
@CrossOrigin
public class ModuleController {

    @Autowired
    private ModuleService moduleService;

    @GetMapping
    public List<Course> getAllModules() {
        return moduleService.getAllModules();
    }

    @GetMapping("/search/{text}")
    public List<Course> search(@PathVariable String text) {
        return moduleService.searchModule(text);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Course> getModuleByCode(@PathVariable String id) {
        Optional<Course> module = moduleService.getModuleById(id);
        return module.map(ResponseEntity::ok)
                     .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/sem/{semester}")
    public List<Course> getModuleBySemester(@PathVariable int semester) {
        List <Course> courses = moduleService.getModuleBySemester(semester);
        System.out.println("\nCourses at controller: "+courses);
        return courses;
        
    }

    @PostMapping
    public ResponseEntity<Course> addModule(@RequestBody Course course) {
        Course savedCourse = moduleService.addModule(course);
        return ResponseEntity.ok(savedCourse);
    }

    @PutMapping("/{moduleCode}")
    public ResponseEntity<Course> updateModule(@PathVariable String moduleCode, @RequestBody Course course) {
        Optional<Course> updatedCourse = moduleService.updateModule(moduleCode, course);
        return updatedCourse.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{moduleCode}")
    public ResponseEntity<Void> deleteModule(@PathVariable String moduleCode) {
        boolean isDeleted = moduleService.deleteModule(moduleCode);
        return isDeleted ? ResponseEntity.noContent().build() : ResponseEntity.notFound().build();
    }
}
