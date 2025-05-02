package com.example.deviceregistry.repository;

import com.example.deviceregistry.model.Device;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DeviceRepository extends JpaRepository<Device, Long> {
    // Additional query methods (if needed) will go here later
}
