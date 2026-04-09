# 🏫 School Management API

A RESTful API built using **Node.js, Express.js, and MySQL** to manage schools and retrieve them based on proximity using geographical distance calculation.

---

## 📌 Overview

This API allows users to:
- Add new schools with location details
- Retrieve a list of schools sorted by distance from a given location

The distance is calculated using the **Haversine formula**, which determines the shortest distance between two coordinates on Earth.

---

## ⚙️ Tech Stack

- Node.js – Runtime environment  
- Express.js – Backend framework  
- MySQL – Database  
- mysql2 – Promise-based MySQL driver  
- dotenv – Environment configuration  

---

## 📁 Project Structure
src/
├── index.js
├── config/
│ ├── db.js
│ └── initDB.js
├── controllers/
│ └── schoolController.js
├── middlewares/
│ └── validate.js
├── routes/
│ └── schoolRoutes.js
└── utils/
└── distance.js

database/
└── setup.sql


---

## 🚀 Setup & Run

### 1. Prerequisites
```bash
git clone https://github.com/Gokulmlk/School_Management.git
cd School_Management
```

### 2. Install dependencies
```bash
npm install
```

### 3. Configure environment
```bash
cp .env.example .env
```
Edit `.env`:
```env
PORT=3000
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=school_management
```

### 4. Create the database
```bash
mysql -u root -p < database/setup.sql
```
Or manually run the SQL in MySQL Workbench / phpMyAdmin.

### 5. Start the server
```bash
# Development (auto-reload)
npm run dev

# Production
npm start
```

Server starts at: **http://localhost:3000**

> **Note:** The `schools` table is auto-created on first startup if it doesn't exist.

---

## 📡 API Reference

### Base URL
```
http://localhost:3000
```

---

### GET /
Health check.

**Response 200:**
```json
{
  "success": true,
  "message": "School Management API is running 🚀",
  "version": "1.0.0",
  "endpoints": {
    "addSchool": "POST /addSchool",
    "listSchools": "GET  /listSchools?latitude=<lat>&longitude=<lon>"
  }
}
```

---

### POST /addSchool

Add a new school to the database.

**Request Body (JSON):**
{
  "name": "ABC School",
  "address": "Hyderabad",
  "latitude": 17.3850,
  "longitude": 78.4867
}

**Response 201 — Success:**
```json
{
  "success": true,
  "message": "School added successfully",
  "data": {
    "id": 1,
    "name": "Delhi Public School",
    "address": "Mathura Road, New Delhi, 110003",
    "latitude": 28.5355,
    "longitude": 77.291
  }
}
```

**Response 400 — Validation Error:**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    "address is required and must be a non-empty string",
    "latitude must be a number between -90 and 90"
  ]
}
```

---

### GET /listSchools?latitude=<lat>&longitude=<lon>

Fetch all schools sorted by proximity to the given coordinates.

**Example Request:**
"http://localhost:3000/listSchools?latitude=28.6139&longitude=77.2090"

**Response 200 — Success:**
```json
{
  "success": true,
  "message": "Schools fetched and sorted by proximity",
  "count": 3,
  "user_location": {
    "latitude": 28.6139,
    "longitude": 77.209
  },
  "data": [
    {
      "id": 2,
      "name": "Kendriya Vidyalaya",
      "address": "Sector 8, RK Puram, New Delhi",
      "latitude": 28.5672,
      "longitude": 77.1884,
      "distance_km": 6.23
    },
    {
      "id": 1,
      "name": "Delhi Public School",
      "address": "Mathura Road, New Delhi, 110003",
      "latitude": 28.5355,
      "longitude": 77.291,
      "distance_km": 9.47
    },
    {
      "id": 3,
      "name": "Greenwood High School",
      "address": "Bannerghatta Road, Bengaluru 560083",
      "latitude": 12.8432,
      "longitude": 77.6011,
      "distance_km": 1749.55
    }
  ]
}
```

---

## 📐 Distance Algorithm

Uses the **Haversine formula** to calculate great-circle distance between two GPS coordinates:

```
a = sin²(Δlat/2) + cos(lat1) × cos(lat2) × sin²(Δlon/2)
c = 2 × atan2(√a, √(1−a))
d = R × c   (R = 6371 km)
```

Results are returned in **kilometres**, rounded to 2 decimal places.

---







