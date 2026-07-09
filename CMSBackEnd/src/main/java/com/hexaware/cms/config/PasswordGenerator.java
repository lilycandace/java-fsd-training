package com.hexaware.cms.config;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

public class PasswordGenerator {

    public static void main(String[] args) {

        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

        System.out.println("sha123 -> " + encoder.encode("sha123"));
        System.out.println("officer456 -> " + encoder.encode("officer456"));
        System.out.println("priya123 -> " + encoder.encode("priya123"));
        System.out.println("anita123 -> " + encoder.encode("anita123"));
        System.out.println("head123 -> " + encoder.encode("head123"));

    }
}