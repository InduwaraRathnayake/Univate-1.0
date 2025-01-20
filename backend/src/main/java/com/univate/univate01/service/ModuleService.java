package com.univate.univate01.service;

import com.univate.univate01.model.Course.Course;
import com.univate.univate01.repository.ModuleRepository;
import com.univate.univate01.repository.SearchRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ModuleService {

    @Autowired
    private ModuleRepository moduleRepository;

    @Autowired
    private SearchRepository searchRepository;

    // Get all modules
    public List<Course> getAllModules() {
        return moduleRepository.findAll();
    }

    // Search for a module
    public List<Course> searchModule(String text){
        return searchRepository.findByText(text);
    }

    // Get a specific module by module code
    public Optional<Course> getModuleById(String moduleCode) {
        return moduleRepository.findById(moduleCode);
    }

    // Add a new module
    public Course addModule(Course course) {
        return moduleRepository.save(course);
    }

    // Update an existing module
    public Optional<Course> updateModule(String moduleCode, Course course) {
        return moduleRepository.findById(moduleCode).map(existingCourse -> {
            course.setModuleCode(moduleCode); // Ensure the module code is preserved
            return moduleRepository.save(course);
        });
    }

    // Delete a module
    public boolean deleteModule(String moduleCode) {
        if (moduleRepository.existsById(moduleCode)) {
            moduleRepository.deleteById(moduleCode);
            return true;
        }
        return false;
    }
}
