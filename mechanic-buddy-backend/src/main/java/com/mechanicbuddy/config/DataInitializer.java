package com.mechanicbuddy.config;

import com.mechanicbuddy.entity.MechanicProfile;
import com.mechanicbuddy.entity.Role;
import com.mechanicbuddy.entity.User;
import com.mechanicbuddy.repository.MechanicProfileRepository;
import com.mechanicbuddy.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class DataInitializer {

    @Bean
    public CommandLineRunner initDatabase(UserRepository userRepository,
                                           MechanicProfileRepository mechanicProfileRepository,
                                           PasswordEncoder passwordEncoder) {
        return args -> {
            // Seed Admin Account
            if (!userRepository.existsByEmail("admin@mechanicbuddy.com")) {
                User admin = User.builder()
                        .name("System Admin")
                        .email("admin@mechanicbuddy.com")
                        .password(passwordEncoder.encode("admin123"))
                        .phone("+91 8106015712")
                        .role(Role.ROLE_ADMIN)
                        .build();
                userRepository.save(admin);
                System.out.println("✅ Seeded Admin Account: admin@mechanicbuddy.com / admin123");
            }

            // Seed Mechanic Account
            if (!userRepository.existsByEmail("mechanic@mechanicbuddy.com")) {
                User mechanic = User.builder()
                        .name("Apex Towing & Repair")
                        .email("mechanic@mechanicbuddy.com")
                        .password(passwordEncoder.encode("mechanic123"))
                        .phone("+91 8106015712")
                        .role(Role.ROLE_MECHANIC)
                        .build();
                User savedMechanic = userRepository.save(mechanic);

                MechanicProfile profile = MechanicProfile.builder()
                        .user(savedMechanic)
                        .workshopName("Apex Towing & Mobile Garage")
                        .specializations("General Service, Towing, Jumpstart, AC Repair")
                        .latitude(17.4435)
                        .longitude(78.3772)
                        .hourlyRate(499.0)
                        .rating(4.9)
                        .isAvailable(true)
                        .build();
                mechanicProfileRepository.save(profile);
                System.out.println("✅ Seeded Mechanic Account: mechanic@mechanicbuddy.com / mechanic123");
            }

            // Seed Customer Account
            if (!userRepository.existsByEmail("customer@mechanicbuddy.com")) {
                User customer = User.builder()
                        .name("Anand Reddy")
                        .email("customer@mechanicbuddy.com")
                        .password(passwordEncoder.encode("customer123"))
                        .phone("+91 8106015712")
                        .role(Role.ROLE_CUSTOMER)
                        .build();
                userRepository.save(customer);
                System.out.println("✅ Seeded Customer Account: customer@mechanicbuddy.com / customer123");
            }
        };
    }
}
