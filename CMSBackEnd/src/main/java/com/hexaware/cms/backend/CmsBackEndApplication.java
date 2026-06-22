package com.hexaware.cms.backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.client.RestTemplate;

@SpringBootApplication
public class CmsBackEndApplication {

	public static void main(String[] args) {
		SpringApplication.run(CmsBackEndApplication.class, args);
	}
	@Bean
	public   RestTemplate  getRestTemplate() {
		
		
		return new RestTemplate();
		
		
	}

}
