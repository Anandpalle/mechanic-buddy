package com.mechanicbuddy.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "service_requests")
public class ServiceRequest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "customer_id", nullable = false)
    private User customer;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "mechanic_id")
    private MechanicProfile mechanic;

    private String vehicleModel;
    private String vehicleType;

    @Column(length = 2000)
    private String issueDescription;

    private Double latitude;
    private Double longitude;
    private String address;

    @Enumerated(EnumType.STRING)
    private ServiceStatus status;

    private Double estimatedCost;
    private String paymentStatus;
    private String razorpayOrderId;
    private String razorpayPaymentId;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public ServiceRequest() {}

    public ServiceRequest(Long id, User customer, MechanicProfile mechanic, String vehicleModel, String vehicleType, String issueDescription, Double latitude, Double longitude, String address, ServiceStatus status, Double estimatedCost, String paymentStatus, String razorpayOrderId, String razorpayPaymentId, LocalDateTime createdAt, LocalDateTime updatedAt) {
        this.id = id;
        this.customer = customer;
        this.mechanic = mechanic;
        this.vehicleModel = vehicleModel;
        this.vehicleType = vehicleType;
        this.issueDescription = issueDescription;
        this.latitude = latitude;
        this.longitude = longitude;
        this.address = address;
        this.status = status;
        this.estimatedCost = estimatedCost;
        this.paymentStatus = paymentStatus;
        this.razorpayOrderId = razorpayOrderId;
        this.razorpayPaymentId = razorpayPaymentId;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
        if (this.status == null) this.status = ServiceStatus.PENDING;
        if (this.paymentStatus == null) this.paymentStatus = "UNPAID";
    }

    @PreUpdate
    protected void onUpdate() {
        this.updatedAt = LocalDateTime.now();
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public User getCustomer() { return customer; }
    public void setCustomer(User customer) { this.customer = customer; }

    public MechanicProfile getMechanic() { return mechanic; }
    public void setMechanic(MechanicProfile mechanic) { this.mechanic = mechanic; }

    public String getVehicleModel() { return vehicleModel; }
    public void setVehicleModel(String vehicleModel) { this.vehicleModel = vehicleModel; }

    public String getVehicleType() { return vehicleType; }
    public void setVehicleType(String vehicleType) { this.vehicleType = vehicleType; }

    public String getIssueDescription() { return issueDescription; }
    public void setIssueDescription(String issueDescription) { this.issueDescription = issueDescription; }

    public Double getLatitude() { return latitude; }
    public void setLatitude(Double latitude) { this.latitude = latitude; }

    public Double getLongitude() { return longitude; }
    public void setLongitude(Double longitude) { this.longitude = longitude; }

    public String getAddress() { return address; }
    public void setAddress(String address) { this.address = address; }

    public ServiceStatus getStatus() { return status; }
    public void setStatus(ServiceStatus status) { this.status = status; }

    public Double getEstimatedCost() { return estimatedCost; }
    public void setEstimatedCost(Double estimatedCost) { this.estimatedCost = estimatedCost; }

    public String getPaymentStatus() { return paymentStatus; }
    public void setPaymentStatus(String paymentStatus) { this.paymentStatus = paymentStatus; }

    public String getRazorpayOrderId() { return razorpayOrderId; }
    public void setRazorpayOrderId(String razorpayOrderId) { this.razorpayOrderId = razorpayOrderId; }

    public String getRazorpayPaymentId() { return razorpayPaymentId; }
    public void setRazorpayPaymentId(String razorpayPaymentId) { this.razorpayPaymentId = razorpayPaymentId; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }

    public static ServiceRequestBuilder builder() { return new ServiceRequestBuilder(); }

    public static class ServiceRequestBuilder {
        private Long id;
        private User customer;
        private MechanicProfile mechanic;
        private String vehicleModel;
        private String vehicleType;
        private String issueDescription;
        private Double latitude;
        private Double longitude;
        private String address;
        private ServiceStatus status;
        private Double estimatedCost;
        private String paymentStatus;
        private String razorpayOrderId;
        private String razorpayPaymentId;
        private LocalDateTime createdAt;
        private LocalDateTime updatedAt;

        public ServiceRequestBuilder id(Long id) { this.id = id; return this; }
        public ServiceRequestBuilder customer(User customer) { this.customer = customer; return this; }
        public ServiceRequestBuilder mechanic(MechanicProfile mechanic) { this.mechanic = mechanic; return this; }
        public ServiceRequestBuilder vehicleModel(String vehicleModel) { this.vehicleModel = vehicleModel; return this; }
        public ServiceRequestBuilder vehicleType(String vehicleType) { this.vehicleType = vehicleType; return this; }
        public ServiceRequestBuilder issueDescription(String issueDescription) { this.issueDescription = issueDescription; return this; }
        public ServiceRequestBuilder latitude(Double latitude) { this.latitude = latitude; return this; }
        public ServiceRequestBuilder longitude(Double longitude) { this.longitude = longitude; return this; }
        public ServiceRequestBuilder address(String address) { this.address = address; return this; }
        public ServiceRequestBuilder status(ServiceStatus status) { this.status = status; return this; }
        public ServiceRequestBuilder estimatedCost(Double estimatedCost) { this.estimatedCost = estimatedCost; return this; }
        public ServiceRequestBuilder paymentStatus(String paymentStatus) { this.paymentStatus = paymentStatus; return this; }
        public ServiceRequestBuilder razorpayOrderId(String razorpayOrderId) { this.razorpayOrderId = razorpayOrderId; return this; }
        public ServiceRequestBuilder razorpayPaymentId(String razorpayPaymentId) { this.razorpayPaymentId = razorpayPaymentId; return this; }
        public ServiceRequestBuilder createdAt(LocalDateTime createdAt) { this.createdAt = createdAt; return this; }
        public ServiceRequestBuilder updatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; return this; }

        public ServiceRequest build() {
            return new ServiceRequest(id, customer, mechanic, vehicleModel, vehicleType, issueDescription, latitude, longitude, address, status, estimatedCost, paymentStatus, razorpayOrderId, razorpayPaymentId, createdAt, updatedAt);
        }
    }
}
