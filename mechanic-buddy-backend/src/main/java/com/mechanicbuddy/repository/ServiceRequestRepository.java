package com.mechanicbuddy.repository;

import com.mechanicbuddy.entity.ServiceRequest;
import com.mechanicbuddy.entity.ServiceStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ServiceRequestRepository extends JpaRepository<ServiceRequest, Long> {
    List<ServiceRequest> findByCustomerIdOrderByCreatedAtDesc(Long customerId);
    List<ServiceRequest> findByMechanicIdOrderByCreatedAtDesc(Long mechanicId);
    List<ServiceRequest> findByStatus(ServiceStatus status);
}
