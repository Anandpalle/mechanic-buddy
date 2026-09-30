package com.mechanicbuddy.dto;

import java.util.Map;

public class AnalyticsSummaryDto {
    private Long totalUsers;
    private Long totalMechanics;
    private Long totalServiceRequests;
    private Double totalRevenue;
    private Map<String, Long> statusDistribution;
    private Map<String, Double> monthlyRevenue;
    private Map<String, Long> vehicleTypeBreakdown;

    public AnalyticsSummaryDto() {}

    public AnalyticsSummaryDto(Long totalUsers, Long totalMechanics, Long totalServiceRequests, Double totalRevenue, Map<String, Long> statusDistribution, Map<String, Double> monthlyRevenue, Map<String, Long> vehicleTypeBreakdown) {
        this.totalUsers = totalUsers;
        this.totalMechanics = totalMechanics;
        this.totalServiceRequests = totalServiceRequests;
        this.totalRevenue = totalRevenue;
        this.statusDistribution = statusDistribution;
        this.monthlyRevenue = monthlyRevenue;
        this.vehicleTypeBreakdown = vehicleTypeBreakdown;
    }

    public Long getTotalUsers() { return totalUsers; }
    public void setTotalUsers(Long totalUsers) { this.totalUsers = totalUsers; }

    public Long getTotalMechanics() { return totalMechanics; }
    public void setTotalMechanics(Long totalMechanics) { this.totalMechanics = totalMechanics; }

    public Long getTotalServiceRequests() { return totalServiceRequests; }
    public void setTotalServiceRequests(Long totalServiceRequests) { this.totalServiceRequests = totalServiceRequests; }

    public Double getTotalRevenue() { return totalRevenue; }
    public void setTotalRevenue(Double totalRevenue) { this.totalRevenue = totalRevenue; }

    public Map<String, Long> getStatusDistribution() { return statusDistribution; }
    public void setStatusDistribution(Map<String, Long> statusDistribution) { this.statusDistribution = statusDistribution; }

    public Map<String, Double> getMonthlyRevenue() { return monthlyRevenue; }
    public void setMonthlyRevenue(Map<String, Double> monthlyRevenue) { this.monthlyRevenue = monthlyRevenue; }

    public Map<String, Long> getVehicleTypeBreakdown() { return vehicleTypeBreakdown; }
    public void setVehicleTypeBreakdown(Map<String, Long> vehicleTypeBreakdown) { this.vehicleTypeBreakdown = vehicleTypeBreakdown; }

    public static AnalyticsSummaryDtoBuilder builder() { return new AnalyticsSummaryDtoBuilder(); }

    public static class AnalyticsSummaryDtoBuilder {
        private Long totalUsers;
        private Long totalMechanics;
        private Long totalServiceRequests;
        private Double totalRevenue;
        private Map<String, Long> statusDistribution;
        private Map<String, Double> monthlyRevenue;
        private Map<String, Long> vehicleTypeBreakdown;

        public AnalyticsSummaryDtoBuilder totalUsers(Long totalUsers) { this.totalUsers = totalUsers; return this; }
        public AnalyticsSummaryDtoBuilder totalMechanics(Long totalMechanics) { this.totalMechanics = totalMechanics; return this; }
        public AnalyticsSummaryDtoBuilder totalServiceRequests(Long totalServiceRequests) { this.totalServiceRequests = totalServiceRequests; return this; }
        public AnalyticsSummaryDtoBuilder totalRevenue(Double totalRevenue) { this.totalRevenue = totalRevenue; return this; }
        public AnalyticsSummaryDtoBuilder statusDistribution(Map<String, Long> statusDistribution) { this.statusDistribution = statusDistribution; return this; }
        public AnalyticsSummaryDtoBuilder monthlyRevenue(Map<String, Double> monthlyRevenue) { this.monthlyRevenue = monthlyRevenue; return this; }
        public AnalyticsSummaryDtoBuilder vehicleTypeBreakdown(Map<String, Long> vehicleTypeBreakdown) { this.vehicleTypeBreakdown = vehicleTypeBreakdown; return this; }

        public AnalyticsSummaryDto build() {
            return new AnalyticsSummaryDto(totalUsers, totalMechanics, totalServiceRequests, totalRevenue, statusDistribution, monthlyRevenue, vehicleTypeBreakdown);
        }
    }
}
