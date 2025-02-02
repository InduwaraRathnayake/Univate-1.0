package com.univate.univate01.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.univate.univate01.model.Stream.Stream;
import com.univate.univate01.repository.StreamRepository;

@Service
public class StreamService {
    
    @Autowired
    private StreamRepository streamRepository;

     // Get all modules
    public List<Stream> getAllStreams() {
        return streamRepository.findAll();
    }

      // Get a module by semester
     public Optional<Stream> getStreamByCode(int code) {
        return streamRepository.findByCode(code);
    }
}
