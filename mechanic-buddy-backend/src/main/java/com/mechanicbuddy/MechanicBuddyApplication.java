package com.mechanicbuddy;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class MechanicBuddyApplication {

    public static void main(String[] args) {
        SpringApplication.run(MechanicBuddyApplication.class, args);
        System.out.println("=================================================");
        System.out.println("  MECHANIC BUDDY SPRING BOOT BACKEND STARTED!   ");
        System.out.println("  Listening on: http://localhost:8080           ");
        System.out.println("=================================================");
    }
}
