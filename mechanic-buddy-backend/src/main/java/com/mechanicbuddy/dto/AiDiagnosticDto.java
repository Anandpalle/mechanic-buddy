package com.mechanicbuddy.dto;

import java.util.List;

public class AiDiagnosticDto {
    private String symptoms;
    private String probableCause;
    private String severityLevel;
    private String estimatedCostRange;
    private List<String> recommendedActions;
    private List<String> suitableServiceTypes;

    public AiDiagnosticDto() {}

    public AiDiagnosticDto(String symptoms, String probableCause, String severityLevel, String estimatedCostRange, List<String> recommendedActions, List<String> suitableServiceTypes) {
        this.symptoms = symptoms;
        this.probableCause = probableCause;
        this.severityLevel = severityLevel;
        this.estimatedCostRange = estimatedCostRange;
        this.recommendedActions = recommendedActions;
        this.suitableServiceTypes = suitableServiceTypes;
    }

    public String getSymptoms() { return symptoms; }
    public void setSymptoms(String symptoms) { this.symptoms = symptoms; }

    public String getProbableCause() { return probableCause; }
    public void setProbableCause(String probableCause) { this.probableCause = probableCause; }

    public String getSeverityLevel() { return severityLevel; }
    public void setSeverityLevel(String severityLevel) { this.severityLevel = severityLevel; }

    public String getEstimatedCostRange() { return estimatedCostRange; }
    public void setEstimatedCostRange(String estimatedCostRange) { this.estimatedCostRange = estimatedCostRange; }

    public List<String> getRecommendedActions() { return recommendedActions; }
    public void setRecommendedActions(List<String> recommendedActions) { this.recommendedActions = recommendedActions; }

    public List<String> getSuitableServiceTypes() { return suitableServiceTypes; }
    public void setSuitableServiceTypes(List<String> suitableServiceTypes) { this.suitableServiceTypes = suitableServiceTypes; }

    public static AiDiagnosticDtoBuilder builder() { return new AiDiagnosticDtoBuilder(); }

    public static class AiDiagnosticDtoBuilder {
        private String symptoms;
        private String probableCause;
        private String severityLevel;
        private String estimatedCostRange;
        private List<String> recommendedActions;
        private List<String> suitableServiceTypes;

        public AiDiagnosticDtoBuilder symptoms(String symptoms) { this.symptoms = symptoms; return this; }
        public AiDiagnosticDtoBuilder probableCause(String probableCause) { this.probableCause = probableCause; return this; }
        public AiDiagnosticDtoBuilder severityLevel(String severityLevel) { this.severityLevel = severityLevel; return this; }
        public AiDiagnosticDtoBuilder estimatedCostRange(String estimatedCostRange) { this.estimatedCostRange = estimatedCostRange; return this; }
        public AiDiagnosticDtoBuilder recommendedActions(List<String> recommendedActions) { this.recommendedActions = recommendedActions; return this; }
        public AiDiagnosticDtoBuilder suitableServiceTypes(List<String> suitableServiceTypes) { this.suitableServiceTypes = suitableServiceTypes; return this; }

        public AiDiagnosticDto build() {
            return new AiDiagnosticDto(symptoms, probableCause, severityLevel, estimatedCostRange, recommendedActions, suitableServiceTypes);
        }
    }
}
