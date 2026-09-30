package com.mechanicbuddy.service;

import com.mechanicbuddy.dto.AiDiagnosticDto;
import org.springframework.stereotype.Service;
import java.util.Arrays;
import java.util.List;

@Service
public class AiAssistantService {

    public AiDiagnosticDto diagnoseVehicleIssue(String query) {
        String lower = query.toLowerCase();

        if (lower.contains("engine") || lower.contains("smoke") || lower.contains("heat")) {
            return AiDiagnosticDto.builder()
                    .symptoms(query)
                    .probableCause("Engine Overheating or Coolant Leakage")
                    .severityLevel("HIGH")
                    .estimatedCostRange("₹1,200 - ₹3,500")
                    .recommendedActions(Arrays.asList(
                            "Immediately pull over to a safe location.",
                            "Turn off the engine and wait at least 15 minutes before opening the bonnet.",
                            "Do NOT attempt to open the radiator cap while the engine is hot."
                    ))
                    .suitableServiceTypes(Arrays.asList("Engine Diagnostics", "Towing Service", "Emergency Coolant Refill"))
                    .build();
        } else if (lower.contains("brake") || lower.contains("noise") || lower.contains("squeak")) {
            return AiDiagnosticDto.builder()
                    .symptoms(query)
                    .probableCause("Worn Brake Pads or Rotor Friction")
                    .severityLevel("MEDIUM")
                    .estimatedCostRange("₹800 - ₹2,000")
                    .recommendedActions(Arrays.asList(
                            "Avoid high speeds and sudden braking.",
                            "Check brake fluid level in the reservoir.",
                            "Book a mechanic immediately to inspect brake pad thickness."
                    ))
                    .suitableServiceTypes(Arrays.asList("Brake Repair & Replacement", "On-site Brake Inspection"))
                    .build();
        } else if (lower.contains("tire") || lower.contains("tyre") || lower.contains("flat") || lower.contains("punctured")) {
            return AiDiagnosticDto.builder()
                    .symptoms(query)
                    .probableCause("Punctured Tire or Pressure Loss")
                    .severityLevel("MEDIUM")
                    .estimatedCostRange("₹300 - ₹800")
                    .recommendedActions(Arrays.asList(
                            "Park on level ground away from traffic.",
                            "Turn on hazard warning lights.",
                            "Use a jack and lug wrench to switch to spare tire or request instant puncture assistance."
                    ))
                    .suitableServiceTypes(Arrays.asList("Flat Tire Change", "Puncture Repair", "Wheel Alignment"))
                    .build();
        } else if (lower.contains("battery") || lower.contains("start") || lower.contains("click")) {
            return AiDiagnosticDto.builder()
                    .symptoms(query)
                    .probableCause("Discharged Battery or Faulty Starter Motor")
                    .severityLevel("LOW")
                    .estimatedCostRange("₹400 - ₹1,500")
                    .recommendedActions(Arrays.asList(
                            "Check if dashboard headlights dim when turning ignition key.",
                            "Inspect battery terminals for white corrosion or loose connections.",
                            "Request a mobile battery jumpstart."
                    ))
                    .suitableServiceTypes(Arrays.asList("Battery Jumpstart", "Battery Replacement", "Electrical Inspection"))
                    .build();
        } else {
            return AiDiagnosticDto.builder()
                    .symptoms(query)
                    .probableCause("General Mechanical or Sensor Anomaly")
                    .severityLevel("MEDIUM")
                    .estimatedCostRange("₹500 - ₹2,500")
                    .recommendedActions(Arrays.asList(
                            "Check dashboard warning indicator lights (Check Engine, Oil, ABS).",
                            "Listen for unusual vibrations or sounds while idling.",
                            "Connect with a nearby certified mechanic for OBD-II scanner diagnostics."
                    ))
                    .suitableServiceTypes(Arrays.asList("Full Vehicle Scan", "General Service", "Roadside Inspection"))
                    .build();
        }
    }
}
