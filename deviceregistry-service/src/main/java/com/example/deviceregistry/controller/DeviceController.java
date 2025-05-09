package com.example.deviceregistry.controller;

import com.example.deviceregistry.model.Device;
import com.example.deviceregistry.service.DeviceService;

import jakarta.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
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
    public ResponseEntity<?> createDevice(@Valid @RequestBody Device device) {
        Device savedDevice = deviceService.createDevice(device);
        return new ResponseEntity<>(savedDevice,HttpStatus.CREATED);
    }

    // PUT: Update an existing device
    @PutMapping("/{id}")
    public ResponseEntity<?> updateDevice(@PathVariable Long id, @Valid @RequestBody Device device) {
        Device updateDevice = deviceService.updateDevice(id, device);
        return ResponseEntity.ok(updateDevice);
    }

    // DELETE: Delete device by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDevice(@PathVariable Long id) {
        deviceService.deleteDevice(id);
        return ResponseEntity.noContent().build();
    }

    // --- Step 13: Control Endpoints ---

    // PUT: Toggle power (on/off)
    @PutMapping("/{id}/power")
    public ResponseEntity<Device> togglePower(@PathVariable Long id) {
        return ResponseEntity.ok(deviceService.togglePower(id));
    }

    // PUT: Volume Up
    @PutMapping("/{id}/volume/up")
    public ResponseEntity<Device> volumeUp(@PathVariable Long id) {
        return ResponseEntity.ok(deviceService.volumeUp(id));
    }

    // PUT: Volume Down
    @PutMapping("/{id}/volume/down")
    public ResponseEntity<Device> volumeDown(@PathVariable Long id) {
        return ResponseEntity.ok(deviceService.volumeDown(id));
    }

    // PUT: Mute device
    @PutMapping("/{id}/mute")
    public ResponseEntity<Device> mute(@PathVariable Long id) {
        return ResponseEntity.ok(deviceService.mute(id));
    }
}
