package com.mechanicbuddy.controller;

import com.mechanicbuddy.entity.ContactMessage;
import com.mechanicbuddy.repository.ContactMessageRepository;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/contact")
@CrossOrigin(origins = "*")
public class ContactController {

    private final ContactMessageRepository contactMessageRepository;

    public ContactController(ContactMessageRepository contactMessageRepository) {
        this.contactMessageRepository = contactMessageRepository;
    }

    // Public endpoint for submitting contact messages
    @PostMapping
    public ResponseEntity<?> submitContactForm(@Valid @RequestBody ContactMessage message) {
        ContactMessage saved = contactMessageRepository.save(message);
        return ResponseEntity.ok(Map.of(
            "message", "Thank you for contacting Mechanic Buddy! Our team will get back to you shortly.",
            "contactId", saved.getId()
        ));
    }

    // Admin endpoint to view all contact messages
    @GetMapping("/all")
    public ResponseEntity<List<ContactMessage>> getAllContactMessages() {
        return ResponseEntity.ok(contactMessageRepository.findAllByOrderByCreatedAtDesc());
    }

    // Admin endpoint to update message status
    @PutMapping("/{id}/status")
    public ResponseEntity<?> updateMessageStatus(@PathVariable Long id, @RequestBody Map<String, String> body) {
        return contactMessageRepository.findById(id).map(msg -> {
            msg.setStatus(body.getOrDefault("status", "RESOLVED"));
            contactMessageRepository.save(msg);
            return ResponseEntity.ok(Map.of("message", "Status updated successfully"));
        }).orElse(ResponseEntity.notFound().build());
    }
}
