package com.univate.univate01.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.univate.univate01.model.Course.Course;
import com.univate.univate01.repository.ModuleRepository;

@Service
public class ModuleService {

    @Autowired
    private ModuleRepository moduleRepository;

    public List<Course> getAllModules() {
        return moduleRepository.findAll();
    }

}
