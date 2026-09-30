package com.mechanicbuddy.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "mechanic_profiles")
public class MechanicProfile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id", nullable = false, unique = true)
    private User user;

    private String workshopName;
    private String address;
    private Double latitude;
    private Double longitude;
    private Double hourlyRate;
    private Double rating;
    private Boolean isAvailable;

    @Column(length = 1000)
    private String specializations;

    public MechanicProfile() {}

    public MechanicProfile(Long id, User user, String workshopName, String address, Double latitude, Double longitude, Double hourlyRate, Double rating, Boolean isAvailable, String specializations) {
        this.id = id;
        this.user = user;
        this.workshopName = workshopName;
        this.address = address;
        this.latitude = latitude;
        this.longitude = longitude;
        this.hourlyRate = hourlyRate;
        this.rating = rating;
        this.isAvailable = isAvailable;
        this.specializations = specializations;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }

    public String getWorkshopName() { return workshopName; }
    public void setWorkshopName(String workshopName) { this.workshopName = workshopName; }

    public String getAddress() { return address; }
    public void setAddress(String address) { this.address = address; }

    public Double getLatitude() { return latitude; }
    public void setLatitude(Double latitude) { this.latitude = latitude; }

    public Double getLongitude() { return longitude; }
    public void setLongitude(Double longitude) { this.longitude = longitude; }

    public Double getHourlyRate() { return hourlyRate; }
    public void setHourlyRate(Double hourlyRate) { this.hourlyRate = hourlyRate; }

    public Double getRating() { return rating; }
    public void setRating(Double rating) { this.rating = rating; }

    public Boolean getIsAvailable() { return isAvailable; }
    public void setIsAvailable(Boolean isAvailable) { this.isAvailable = isAvailable; }

    public String getSpecializations() { return specializations; }
    public void setSpecializations(String specializations) { this.specializations = specializations; }

    public static MechanicProfileBuilder builder() { return new MechanicProfileBuilder(); }

    public static class MechanicProfileBuilder {
        private Long id;
        private User user;
        private String workshopName;
        private String address;
        private Double latitude;
        private Double longitude;
        private Double hourlyRate;
        private Double rating;
        private Boolean isAvailable;
        private String specializations;

        public MechanicProfileBuilder id(Long id) { this.id = id; return this; }
        public MechanicProfileBuilder user(User user) { this.user = user; return this; }
        public MechanicProfileBuilder workshopName(String workshopName) { this.workshopName = workshopName; return this; }
        public MechanicProfileBuilder address(String address) { this.address = address; return this; }
        public MechanicProfileBuilder latitude(Double latitude) { this.latitude = latitude; return this; }
        public MechanicProfileBuilder longitude(Double longitude) { this.longitude = longitude; return this; }
        public MechanicProfileBuilder hourlyRate(Double hourlyRate) { this.hourlyRate = hourlyRate; return this; }
        public MechanicProfileBuilder rating(Double rating) { this.rating = rating; return this; }
        public MechanicProfileBuilder isAvailable(Boolean isAvailable) { this.isAvailable = isAvailable; return this; }
        public MechanicProfileBuilder specializations(String specializations) { this.specializations = specializations; return this; }

        public MechanicProfile build() {
            return new MechanicProfile(id, user, workshopName, address, latitude, longitude, hourlyRate, rating, isAvailable, specializations);
        }
    }
}
