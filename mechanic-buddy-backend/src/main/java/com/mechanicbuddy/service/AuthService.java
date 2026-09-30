package com.mechanicbuddy.service;

import com.mechanicbuddy.dto.JwtAuthResponse;
import com.mechanicbuddy.dto.LoginRequest;
import com.mechanicbuddy.dto.RegisterRequest;
import com.mechanicbuddy.entity.MechanicProfile;
import com.mechanicbuddy.entity.Role;
import com.mechanicbuddy.entity.User;
import com.mechanicbuddy.repository.MechanicProfileRepository;
import com.mechanicbuddy.repository.UserRepository;
import com.mechanicbuddy.security.JwtTokenProvider;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final AuthenticationManager authenticationManager;
    private final UserRepository userRepository;
    private final MechanicProfileRepository mechanicProfileRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider tokenProvider;

    public AuthService(AuthenticationManager authenticationManager, UserRepository userRepository, MechanicProfileRepository mechanicProfileRepository, PasswordEncoder passwordEncoder, JwtTokenProvider tokenProvider) {
        this.authenticationManager = authenticationManager;
        this.userRepository = userRepository;
        this.mechanicProfileRepository = mechanicProfileRepository;
        this.passwordEncoder = passwordEncoder;
        this.tokenProvider = tokenProvider;
    }

    public JwtAuthResponse login(LoginRequest request) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String token = tokenProvider.generateToken(authentication);

        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));

        return JwtAuthResponse.builder()
                .token(token)
                .tokenType("Bearer")
                .userId(user.getId())
                .name(user.getName())
                .email(user.getEmail())
                .role(user.getRole())
                .phone(user.getPhone())
                .build();
    }

    public JwtAuthResponse register(RegisterRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email already registered!");
        }

        Role assignedRole = request.getRole() != null ? request.getRole() : Role.ROLE_CUSTOMER;

        User user = User.builder()
                .name(request.getName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .phone(request.getPhone())
                .role(assignedRole)
                .build();

        User savedUser = userRepository.save(user);

        if (assignedRole == Role.ROLE_MECHANIC) {
            MechanicProfile profile = MechanicProfile.builder()
                    .user(savedUser)
                    .workshopName(request.getWorkshopName() != null ? request.getWorkshopName() : savedUser.getName() + " Workshop")
                    .specializations(request.getSpecializations() != null ? request.getSpecializations() : "General Repairs, Flat Tire, Towing")
                    .latitude(request.getLatitude() != null ? request.getLatitude() : 12.9716)
                    .longitude(request.getLongitude() != null ? request.getLongitude() : 77.5946)
                    .hourlyRate(request.getHourlyRate() != null ? request.getHourlyRate() : 499.0)
                    .rating(4.5)
                    .isAvailable(true)
                    .build();
            mechanicProfileRepository.save(profile);
        }

        LoginRequest loginReq = new LoginRequest();
        loginReq.setEmail(request.getEmail());
        loginReq.setPassword(request.getPassword());
        return login(loginReq);
    }
}
