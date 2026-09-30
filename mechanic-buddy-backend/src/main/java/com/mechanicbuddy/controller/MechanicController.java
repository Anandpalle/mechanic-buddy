package com.mechanicbuddy.controller;

import com.mechanicbuddy.entity.MechanicProfile;
import com.mechanicbuddy.repository.MechanicProfileRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/mechanics")
@CrossOrigin(origins = "*")
public class MechanicController {

    private final MechanicProfileRepository mechanicProfileRepository;

    public MechanicController(MechanicProfileRepository mechanicProfileRepository) {
        this.mechanicProfileRepository = mechanicProfileRepository;
    }

    @GetMapping("/nearby")
    public ResponseEntity<List<MechanicProfile>> getNearbyMechanics(
            @RequestParam(required = false, defaultValue = "12.9716") Double lat,
            @RequestParam(required = false, defaultValue = "77.5946") Double lng) {
        List<MechanicProfile> mechanics = mechanicProfileRepository.findByIsAvailableTrue();
        return ResponseEntity.ok(mechanics);
    }

    @GetMapping("/all")
    public ResponseEntity<List<MechanicProfile>> getAllMechanics() {
        return ResponseEntity.ok(mechanicProfileRepository.findAll());
    }

    @PutMapping("/{id}/availability")
    public ResponseEntity<MechanicProfile> toggleAvailability(
            @PathVariable Long id,
            @RequestParam Boolean available) {
        MechanicProfile profile = mechanicProfileRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Mechanic profile not found"));
        profile.setIsAvailable(available);
        return ResponseEntity.ok(mechanicProfileRepository.save(profile));
    }
}
