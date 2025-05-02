🔰 Software Development Process: AVCONTROLHUB

🔰 Overview
This document outlines the architecture, purpose, and high-level design of a Web-Based Device Control System intended to control audiovisual equipment including PTZ cameras, microphones, speakers, and displays over a network. The goal of this project is to provide a unified, intuitive interface that allows users to remotely manage these devices via a web application.

The system is built using a modern, scalable microservices architecture with Java 8, Spring Boot, ReactJS, and MySQL, and is deployed using Docker and Kubernetes for containerization and orchestration. It leverages DevOps practices to ensure continuous integration, automated deployment, and observability.

This document serves as a foundational reference for planning, implementation, and onboarding. It covers the project’s scope, architectural components, technology stack, integration approach, and communication between modules, both at the hardware and software levels.

🔰 Software Development Lifecycle Phases

✅ Phase 1: Requirements & Planning
Finalize list of devices you want to support (e.g., PTZ camera model, mic system, display brand)

Confirm how each device can be controlled (IP API, ONVIF, serial commands, etc.)

Sketch out basic UI needs

Decide which features go into v1 (MVP)

✅ Phase 2: System Architecture
Design microservice layout

Define API endpoints (for frontend ↔ backend)

Define MySQL schema for device registry

Set up Docker Compose (for local testing)

✅ Phase 3: Backend Development
Create Spring Boot microservices:

camera-service

audio-service

display-service

device-registry-service

Add REST controllers and service classes

Implement device API logic (starting with mocks if hardware not ready)

✅ Phase 4: Frontend Development
Set up React project

Build basic dashboard UI

Connect to backend via Axios

Add controls (buttons, sliders, status indicators)

✅ Phase 5: Integration & Local Testing
Use Docker Compose to run services together

Test full flows: UI → backend → simulated device API

✅ Phase 6: Kubernetes & DevOps
Write Kubernetes manifests for services

Add Helm charts or Kustomize if needed

Set up CI/CD pipeline (Jenkins, GitHub Actions)

Monitor with Prometheus/Grafana (optional)

✅ Assumed Device Setup (Mocked Devices)
We’ll assume the following:

Device Type	Mock Features	Communication Method
PTZ Camera	Pan left/right, Tilt up/down, Zoom in/out	REST API (simulated)
Microphone	Volume up/down, Mute/unmute	REST API (simulated)
Speaker	Volume up/down	REST API (simulated)
Display	Power on/off	REST API (simulated)

Each device will be simulated with a simple internal mock API and return a dummy response like {"status": "success"} or {"power": "on"}.

🗂️ Microservices to Build
Service Name	        Description
device-registry	        Stores list of devices, IPs, and metadata
camera-service	        Sends PTZ commands to mock camera API
audio-service	        Sends volume/mute commands to mock mic/speaker
display-service	        Sends power commands to mock display API
frontend (React)	    Control panel for the user interface