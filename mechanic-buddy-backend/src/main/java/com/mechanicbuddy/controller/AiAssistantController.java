package com.mechanicbuddy.controller;

import com.mechanicbuddy.dto.AiDiagnosticDto;
import com.mechanicbuddy.service.AiAssistantService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/ai")
@CrossOrigin(origins = "*")
public class AiAssistantController {

    private final AiAssistantService aiAssistantService;

    public AiAssistantController(AiAssistantService aiAssistantService) {
        this.aiAssistantService = aiAssistantService;
    }

    @PostMapping("/diagnose")
    public ResponseEntity<AiDiagnosticDto> diagnoseIssue(@RequestBody String userQuery) {
        AiDiagnosticDto result = aiAssistantService.diagnoseVehicleIssue(userQuery);
        return ResponseEntity.ok(result);
    }
}
