package com.hexaware.cms.service;

import org.springframework.core.io.Resource;
import org.springframework.web.multipart.MultipartFile;



public interface IFileStorageService {
	
	String uploadFile(MultipartFile file);

	Resource downloadFile(String filename);
//
	boolean deleteFile(String filename);
	Resource viewFile(String filename);

}
