package com.example.deviceregistry.controller;

import com.example.deviceregistry.model.Device;
import com.example.deviceregistry.service.DeviceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/devices")
@CrossOrigin(origins = "*") // This allows React to call the API
public class DeviceController {

    @Autowired
    private DeviceService deviceService;

    // GET: List all devices
    @GetMapping
    public ResponseEntity<List<Device>> getAllDevices() {
        return ResponseEntity.ok(deviceService.getAllDevices());
    }

    // GET: Get device by ID
    @GetMapping("/{id}")
    public ResponseEntity<Device> getDeviceById(@PathVariable Long id) {
        return deviceService.getDeviceById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // POST: Create a new device
    @PostMapping
    public ResponseEntity<Device> createDevice(@RequestBody Device device) {
        return ResponseEntity.ok(deviceService.saveDevice(device));
    }

    // PUT: Update an existing device
    @PutMapping("/{id}")
    public ResponseEntity<Device> updateDevice(@PathVariable Long id, @RequestBody Device updatedDevice) {
        return deviceService.getDeviceById(id)
                .map(existing -> {
                    updatedDevice.setId(id);
                    return ResponseEntity.ok(deviceService.saveDevice(updatedDevice));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    // DELETE: Delete device by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDevice(@PathVariable Long id) {
        deviceService.deleteDevice(id);
        return ResponseEntity.noContent().build();
    }
}
