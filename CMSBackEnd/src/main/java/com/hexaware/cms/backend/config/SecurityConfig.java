package com.hexaware.cms.backend.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.NoOpPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.hexaware.cms.backend.filter.JwtAuthFilter;
import com.hexaware.cms.backend.service.UserInfoUserDetailsService;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity

public class SecurityConfig {

	@Autowired
	JwtAuthFilter authFilter;

//    @Bean
//    //authentication
//    public UserDetailsService userDetailsService() {
//		/*
//		 * UserDetails admin = User.withUsername("Basant")
//		 * .password(encoder.encode("Pwd1")) .roles("ADMIN") .build(); UserDetails user
//		 * = User.withUsername("John") .password(encoder.encode("Pwd2"))
//		 * .roles("USER","ADMIN","HR") .build(); return new
//		 * InMemoryUserDetailsManager(admin, user);
//		 */
//       return new UserInfoUserDetailsService();
//    }
//    
	@Autowired
	private UserInfoUserDetailsService userDetailsService;

//    @Bean
//    public  SecurityFilterChain   getSecurityFilterChain(HttpSecurity http) throws Exception {
//    	
//    		return http.csrf().disable()
//    			.authorizeHttpRequests().
//    			requestMatchers("/products/welcome","/users/registration/new","/users/login/authenticate")
//    			.permitAll()
//    			.and()
//    			.authorizeHttpRequests().requestMatchers("/products/**")
//    			.authenticated().and()   //.formLogin().and().build();
//    			.sessionManagement()
//    			.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
//    			.and()
//    			.authenticationProvider(authenticationProvider())
//    			.addFilterBefore(authFilter	, UsernamePasswordAuthenticationFilter.class)
//    			.build();
//    	
//    }
//    
//    
	@Bean
	public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

		return http.csrf(csrf -> csrf.disable())

				.authorizeHttpRequests(auth -> auth

						.requestMatchers("/auth/login", "/swagger-ui/**", "/v3/api-docs/**").permitAll()

						.anyRequest().authenticated())

				.sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))

				.authenticationProvider(authenticationProvider())

				.addFilterBefore(authFilter, UsernamePasswordAuthenticationFilter.class)

				.build();
	}

	@Bean
	public PasswordEncoder passwordEncoder() {
		return NoOpPasswordEncoder.getInstance();
	}

	@Bean
	public AuthenticationProvider authenticationProvider() {
		DaoAuthenticationProvider authenticationProvider = new DaoAuthenticationProvider();
		authenticationProvider.setUserDetailsService(userDetailsService);
		authenticationProvider.setPasswordEncoder(passwordEncoder());
		return authenticationProvider;
	}

	@Bean
	public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {

		return config.getAuthenticationManager();

	}

}
