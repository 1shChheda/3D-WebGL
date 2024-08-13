# WebAR Face Tracking

This project is a face tracking application built using Three.js, A-Frame, Mediapipe and OpenCV. It provides real-time face tracking and rendering capabilities directly in the browser. The project is structured with modern JavaScript tools, using Vite for development and building processes.

## Table of Contents
- [Project Overview](#project-overview)
- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the Project](#running-the-project)

## Project Overview
The project focuses on face tracking and interaction within a 3D environment, using Three.js, A-Frame, and Mediapipe. It provides a foundation for creating web-based augmented reality (AR) experiences.

## Features
- **Real-Time Face Tracking**: Uses Mediapipe & OpenCV for robust face tracking.
- **3D Rendering**: Uses Three.js to render 3D objects, including face geometry, with precise control over interactions.
- **Integration with A-Frame**: For handling 3D models and interactions in a web environment.

## Getting Started

### Prerequisites
Ensure you have the following installed on your machine:
- **Node.js** (v14 or higher)
- **npm** or **yarn**
- A modern web browser (e.g., Chrome, Firefox)

### Installation

1. **Clone the Repository & Navigate to Project directory**:
   ```bash
   cd .\webar\
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **SSL Setup**:
   Ensure you have your SSL certificates (`key.pem` and `cert.pem`) placed in the `ssl/` directory within the project root. These are necessary for HTTPS support during local development.

### Running the Project

1. **Start the Development Server**:
   ```bash
   npm run dev
   ```

2. **Access the Application**:
   Open your web browser and navigate to:
   ```
   https://localhost:5173
   ```