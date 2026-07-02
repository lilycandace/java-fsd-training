package com.hexaware.cms.backend.service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;


@Service
public class FileStorageServiceImpl implements IFileStorageService {

	@Value("${file.upload-dir}")
	private String uploadDir;

	@Override
	public String uploadFile(MultipartFile file) {

		try {

			// Create the upload folder if it doesn't already exist
			Path path = Paths.get(uploadDir);

			if (!Files.exists(path)) {
				Files.createDirectories(path);
			}

			// Get the original filename (e.g., crime.jpg)
			String fileName = file.getOriginalFilename();

			// Create the complete file path (uploads/crime.jpg)
			Path filePath = path.resolve(fileName);

			// Copy the uploaded file into the uploads folder
			Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

			return fileName;

		} catch (IOException e) {

			throw new RuntimeException("File upload failed");

		}

	}
	@Override
	public Resource downloadFile(String filename) {

	    try {

	        Path filePath = Paths.get(uploadDir).resolve(filename);

	        Resource resource = new UrlResource(filePath.toUri());

	        if (resource.exists() && resource.isReadable()) {
	            return resource;
	        }

	        throw new RuntimeException("File not found");

	    } catch (Exception e) {

	        throw new RuntimeException("Could not download file");

	    }

	}
	@Override
	public boolean deleteFile(String filename) {

	    try {

	        Path filePath = Paths.get(uploadDir).resolve(filename);

	        return Files.deleteIfExists(filePath);

	    } catch (IOException e) {

	        throw new RuntimeException("Could not delete file");

	    }

	}
	@Override
	public Resource viewFile(String filename) {

	    try {

	        Path filePath = Paths.get(uploadDir).resolve(filename);

	        Resource resource = new UrlResource(filePath.toUri());

	        if (resource.exists() && resource.isReadable()) {
	            return resource;
	        }

	        throw new RuntimeException("File not found");

	    } catch (Exception e) {

	        throw new RuntimeException("Could not view file");

	    }

	}

}