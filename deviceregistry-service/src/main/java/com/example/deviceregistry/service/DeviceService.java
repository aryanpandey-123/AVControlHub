package com.example.deviceregistry.service;

import com.example.deviceregistry.ResourceNotFoundException;
import com.example.deviceregistry.model.Device;
import com.example.deviceregistry.repository.DeviceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class DeviceService {

    @Autowired
    private DeviceRepository deviceRepository;

    // Create or update device
    public Device saveDevice(Device device) {
        return deviceRepository.save(device);
    }

    // Get all devices
    public List<Device> getAllDevices() {
        return deviceRepository.findAll();
    }

    // Get a device by ID
    public Optional<Device> getDeviceById(Long id) {
        return Optional.of(deviceRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Device not found with ID: " + id)));
    }

    // Delete a device by ID
    public void deleteDevice(Long id) {
        Device device = deviceRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Device not found with ID: " + id));
        deviceRepository.delete(device);
    }
    //Create device 
    public Device createDevice(Device device)
    {
        return deviceRepository.save(device);
    }

    // Update Device
    // @Override
    public Device updateDevice(Long id, Device updatedDevice) {
        Device existingDevice = deviceRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Device not found with id: " + id));

        existingDevice.setName(updatedDevice.getName());
        existingDevice.setType(updatedDevice.getType());
        existingDevice.setIpAddress(updatedDevice.getIpAddress());
        existingDevice.setPort(updatedDevice.getPort());
        existingDevice.setStatus(updatedDevice.getStatus());

        return deviceRepository.save(existingDevice);
    }

    // --- Step 13: Control Logic Methods ---

    public Device togglePower(Long id) {
        Device device = deviceRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Device not found with id: " + id));
        String currentStatus = device.getStatus();
        device.setStatus("on".equalsIgnoreCase(currentStatus) ? "off" : "on");
        return deviceRepository.save(device);
    }

    public Device volumeUp(Long id) {
        Device device = deviceRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Device not found with id: " + id));

        // If volume is null, set it to a default value (e.g., 50)
        Integer currentVolume = device.getVolume();
        if (currentVolume == null) {
            currentVolume = 50; // Default volume
        }

        // Increase volume by 10 but ensure it doesn't exceed 100
        device.setVolume(Math.min(currentVolume + 10, 100)); // Max volume 100
        return deviceRepository.save(device);
    }

    public Device volumeDown(Long id) {
        Device device = deviceRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Device not found with id: " + id));

        // If volume is null, set it to a default value (e.g., 50)
        Integer currentVolume = device.getVolume();
        if (currentVolume == null) {
            currentVolume = 50; // Default volume
        }

        // Decrease volume by 10 but ensure it doesn't go below 0
        device.setVolume(Math.max(currentVolume - 10, 0)); // Min volume 0
        return deviceRepository.save(device);
    }

    public Device mute(Long id) {
        Device device = deviceRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Device not found with id: " + id));
        device.setVolume(0); // Set volume to 0 for mute
        return deviceRepository.save(device);
    }
}
