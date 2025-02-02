package com.univate.univate01.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.univate.univate01.model.Stream.Stream;
import com.univate.univate01.service.StreamService;

@RestController
@RequestMapping("/api/streams") 
@CrossOrigin
public class StreamController {
    @Autowired
    private StreamService streamService;

    @GetMapping
    public List<Stream> getAllStreams() {
        return streamService.getAllStreams();
    }

    @GetMapping("/{code}")
    public ResponseEntity<Stream> getStreamByCode(@PathVariable int code) {
        Optional<Stream> module = streamService.getStreamByCode(code);
        return module.map(ResponseEntity::ok)
                     .orElse(ResponseEntity.notFound().build());
    }
}
