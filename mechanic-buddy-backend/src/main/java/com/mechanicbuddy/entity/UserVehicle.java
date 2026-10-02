package com.mechanicbuddy.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import java.time.LocalDateTime;

@Entity
@Table(name = "user_vehicles")
public class UserVehicle {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @NotBlank(message = "Vehicle type is required")
    private String vehicleType; // Car, Bike, EV, SUV, Commercial

    @NotBlank(message = "Manufacturer is required")
    private String manufacturer; // Honda, Maruti, Hyundai, Tata, etc.

    @NotBlank(message = "Model is required")
    private String model; // City, Swift, Nexon, etc.

    @NotBlank(message = "Registration number is required")
    private String registrationNumber; // TS 09 AB 1234

    private Integer manufacturingYear;
    private String fuelType; // Petrol, Diesel, EV, CNG
    private String color;
    private Integer currentMileage;

    private LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
    }

    public UserVehicle() {}

    public UserVehicle(User user, String vehicleType, String manufacturer, String model, String registrationNumber, Integer manufacturingYear, String fuelType, String color, Integer currentMileage) {
        this.user = user;
        this.vehicleType = vehicleType;
        this.manufacturer = manufacturer;
        this.model = model;
        this.registrationNumber = registrationNumber;
        this.manufacturingYear = manufacturingYear;
        this.fuelType = fuelType;
        this.color = color;
        this.currentMileage = currentMileage;
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }

    public String getVehicleType() { return vehicleType; }
    public void setVehicleType(String vehicleType) { this.vehicleType = vehicleType; }

    public String getManufacturer() { return manufacturer; }
    public void setManufacturer(String manufacturer) { this.manufacturer = manufacturer; }

    public String getModel() { return model; }
    public void setModel(String model) { this.model = model; }

    public String getRegistrationNumber() { return registrationNumber; }
    public void setRegistrationNumber(String registrationNumber) { this.registrationNumber = registrationNumber; }

    public Integer getManufacturingYear() { return manufacturingYear; }
    public void setManufacturingYear(Integer manufacturingYear) { this.manufacturingYear = manufacturingYear; }

    public String getFuelType() { return fuelType; }
    public void setFuelType(String fuelType) { this.fuelType = fuelType; }

    public String getColor() { return color; }
    public void setColor(String color) { this.color = color; }

    public Integer getCurrentMileage() { return currentMileage; }
    public void setCurrentMileage(Integer currentMileage) { this.currentMileage = currentMileage; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}
