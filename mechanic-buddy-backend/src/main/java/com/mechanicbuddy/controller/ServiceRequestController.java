package com.mechanicbuddy.controller;

import com.mechanicbuddy.dto.ServiceBookingRequest;
import com.mechanicbuddy.entity.*;
import com.mechanicbuddy.repository.*;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/services")
@CrossOrigin(origins = "*")
public class ServiceRequestController {

    private final ServiceRequestRepository serviceRequestRepository;
    private final UserRepository userRepository;
    private final MechanicProfileRepository mechanicProfileRepository;

    public ServiceRequestController(ServiceRequestRepository serviceRequestRepository, UserRepository userRepository, MechanicProfileRepository mechanicProfileRepository) {
        this.serviceRequestRepository = serviceRequestRepository;
        this.userRepository = userRepository;
        this.mechanicProfileRepository = mechanicProfileRepository;
    }

    @PostMapping("/book")
    public ResponseEntity<ServiceRequest> createServiceBooking(
            Authentication authentication,
            @RequestBody ServiceBookingRequest bookingRequest) {

        String email = authentication.getName();
        User customer = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Customer not found"));

        MechanicProfile mechanic = null;
        if (bookingRequest.getMechanicId() != null) {
            mechanic = mechanicProfileRepository.findById(bookingRequest.getMechanicId()).orElse(null);
        }

        ServiceRequest request = ServiceRequest.builder()
                .customer(customer)
                .mechanic(mechanic)
                .vehicleModel(bookingRequest.getVehicleModel())
                .vehicleType(bookingRequest.getVehicleType())
                .issueDescription(bookingRequest.getIssueDescription())
                .latitude(bookingRequest.getLatitude())
                .longitude(bookingRequest.getLongitude())
                .address(bookingRequest.getAddress())
                .status(ServiceStatus.PENDING)
                .estimatedCost(bookingRequest.getEstimatedCost() != null ? bookingRequest.getEstimatedCost() : 650.0)
                .paymentStatus("UNPAID")
                .build();

        return ResponseEntity.ok(serviceRequestRepository.save(request));
    }

    @GetMapping("/my-requests")
    public ResponseEntity<List<ServiceRequest>> getMyServiceRequests(Authentication authentication) {
        String email = authentication.getName();
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return ResponseEntity.ok(serviceRequestRepository.findByCustomerIdOrderByCreatedAtDesc(user.getId()));
    }

    @GetMapping("/all")
    public ResponseEntity<List<ServiceRequest>> getAllRequests() {
        return ResponseEntity.ok(serviceRequestRepository.findAll());
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<ServiceRequest> updateStatus(
            @PathVariable Long id,
            @RequestParam ServiceStatus status) {
        ServiceRequest request = serviceRequestRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Service request not found"));
        request.setStatus(status);
        return ResponseEntity.ok(serviceRequestRepository.save(request));
    }
}
