package com.mechanicbuddy.repository;

import com.mechanicbuddy.entity.MechanicProfile;
import com.mechanicbuddy.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface MechanicProfileRepository extends JpaRepository<MechanicProfile, Long> {
    Optional<MechanicProfile> findByUser(User user);
    Optional<MechanicProfile> findByUserId(Long userId);
    List<MechanicProfile> findByIsAvailableTrue();
}
