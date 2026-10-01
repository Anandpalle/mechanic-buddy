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
            // Force seed or update Admin Account
            User admin = userRepository.findByEmail("admin@mechanicbuddy.com").orElseGet(User::new);
            admin.setName("System Admin");
            admin.setEmail("admin@mechanicbuddy.com");
            admin.setPassword(passwordEncoder.encode("admin123"));
            admin.setPhone("+91 8106015712");
            admin.setRole(Role.ROLE_ADMIN);
            userRepository.save(admin);
            System.out.println("✅ Forced Admin Account Setup: admin@mechanicbuddy.com / admin123");

            // Force seed or update Mechanic Account
            User mechanic = userRepository.findByEmail("mechanic@mechanicbuddy.com").orElseGet(User::new);
            mechanic.setName("Apex Towing & Repair");
            mechanic.setEmail("mechanic@mechanicbuddy.com");
            mechanic.setPassword(passwordEncoder.encode("mechanic123"));
            mechanic.setPhone("+91 8106015712");
            mechanic.setRole(Role.ROLE_MECHANIC);
            User savedMechanic = userRepository.save(mechanic);

            if (mechanicProfileRepository.findByUser(savedMechanic).isEmpty()) {
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
            }
            System.out.println("✅ Forced Mechanic Account Setup: mechanic@mechanicbuddy.com / mechanic123");

            // Force seed or update Customer Account
            User customer = userRepository.findByEmail("customer@mechanicbuddy.com").orElseGet(User::new);
            customer.setName("Anand Reddy");
            customer.setEmail("customer@mechanicbuddy.com");
            customer.setPassword(passwordEncoder.encode("customer123"));
            customer.setPhone("+91 8106015712");
            customer.setRole(Role.ROLE_CUSTOMER);
            userRepository.save(customer);
            System.out.println("✅ Forced Customer Account Setup: customer@mechanicbuddy.com / customer123");
        };
    }
}
