package com.hexaware.cms.backend.controller;

import java.io.IOException;
import java.nio.file.Files;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.hexaware.cms.backend.service.IFileStorageService;

import io.swagger.v3.oas.annotations.security.SecurityRequirement;

@RestController
@RequestMapping("/files")
@SecurityRequirement(name = "Bearer Authentication")
public class FileController {

    @Autowired
    private IFileStorageService fileStorageService;

    @PostMapping(
            value = "/upload",
            consumes = MediaType.MULTIPART_FORM_DATA_VALUE
    )
    public ResponseEntity<String> uploadFile(
            @RequestParam("file") MultipartFile file) {

        String fileName = fileStorageService.uploadFile(file);

        return ResponseEntity.ok("File uploaded successfully: " + fileName);
    }
    @GetMapping("/download/{filename}")
    public ResponseEntity<Resource> downloadFile(
            @PathVariable String filename) {

        Resource resource = fileStorageService.downloadFile(filename);

        String contentType = "application/octet-stream";

        try {
            contentType = Files.probeContentType(resource.getFile().toPath());
        } catch (IOException e) {
            e.printStackTrace();
        }

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION,
                        "attachment; filename=\"" + resource.getFilename() + "\"")
                .contentType(MediaType.parseMediaType(contentType))
                .body(resource);
    }
    @DeleteMapping("/delete/{filename}")
    public ResponseEntity<String> deleteFile(
            @PathVariable String filename) {

        boolean deleted = fileStorageService.deleteFile(filename);

        if (deleted) {
            return ResponseEntity.ok("File deleted successfully.");
        }

        return ResponseEntity.badRequest().body("File not found.");
    }
    @GetMapping("/view/{filename}")
    public ResponseEntity<Resource> viewFile(
            @PathVariable String filename) {

        Resource resource = fileStorageService.viewFile(filename);

        String contentType = "application/octet-stream";

        try {
            contentType = Files.probeContentType(resource.getFile().toPath());
        } catch (IOException e) {
            e.printStackTrace();
        }

        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(contentType))
                .body(resource);
    }
}