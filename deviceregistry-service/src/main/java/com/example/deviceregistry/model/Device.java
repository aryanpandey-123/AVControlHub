package com.example.deviceregistry.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;

@Entity
@Table(name = "devices")
public class Device {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Device name is required")
    private String name;

    @NotNull(message = "Device type is required")
    @Enumerated(EnumType.STRING)
    private DeviceType type;

    @NotBlank(message = "IP Address is required")
    @Pattern(
        regexp = "^((25[0-5]|2[0-4]\\d|[01]?\\d\\d?)(\\.|$)){4}$",
        message = "Invalid IP address format"
    )
    private String ipAddress;

    @NotNull(message = "Port is required")
    @Min(value = 1, message = "Port must be greater than 0")
    @Max(value = 65535, message = "Port must be less than 65536")
    private Integer port;

    private String status;

    @Min(value = 0, message = "Volume cannot be less than 0")
    @Max(value = 100, message = "Volume cannot exceed 100")
    private Integer volume = 50; // 🔹 Default value

    // Getters and Setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public DeviceType getType() {
        return type;
    }

    public void setType(DeviceType type) {
        this.type = type;
    }

    public String getIpAddress() {
        return ipAddress;
    }

    public void setIpAddress(String ipAddress) {
        this.ipAddress = ipAddress;
    }

    public Integer getPort() {
        return port;
    }

    public void setPort(Integer port) {
        this.port = port;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Integer getVolume() {
        return volume;
    }

    public void setVolume(Integer volume) {
        this.volume = volume;
    }
}
