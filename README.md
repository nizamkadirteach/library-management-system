# Library Management System (LMS)

**Project Title:** Library Management System (LMS)

**Course:** Full Stack Web Development – Capstone

**Developer:** Mohammad Nizam Bin Abdul Kadir

**Date:** 18 July 2025

---

## Overview
The LMS is a full-stack web application that automates core library operations such as catalog management, user registration and borrowing workflows. It supports two roles: **Librarian (Admin)** and **Member**. The backend is built with Spring Boot and MySQL, while the frontend uses React.

## Business Requirements Highlights
- Automate book inventory and lending processes
- Role-based access with registration and login
- Admin features to manage books and members
- Enforce lending limits and overdue fines ($0.50/day up to $20)
- Block borrowing when users have outstanding fines or overdues

## Software Requirements
- Backend: Java 21, Spring Boot 3.5+, MySQL 9+
- Frontend: React (Vite), Axios, Bootstrap
- Authentication via JWT tokens
- Tools: Git and Postman

## System Design Summary
Architecture follows MVC with REST APIs.

```
[React UI] <--Axios--> [Spring Boot REST API] <--JPA--> [MySQL DB]
                           |
                        [Spring Security + JWT]
```

Entities include `users`, `books`, `members`, `borrow_transactions` and `reservations`. The SQL schema resides in `sql/create_tables.sql`.

## Repository Structure
- `lms-backend/` – Spring Boot backend application
- `lms-frontend/` – React frontend
- `sql/` – Database creation scripts

## Setup
1. Create the database `lms_db` and run `sql/create_tables.sql`.
2. Configure a JWT secret in `lms-backend/src/main/resources/application.properties`:
   ```properties
   jwt.secret=BASE64_ENCODED_SECRET
   ```
   You can generate one with `openssl rand -base64 32`.
3. (Optional) Seed sample data with hashed passwords:
   ```bash
   mysql -u root -p lms_db < sql/insert_sample_data.sql
   ```
   Default logins include `admin/admin123` for an admin user.
4. Start the backend:
   ```bash
   cd lms-backend
   ./mvnw spring-boot:run
   ```
5. Start the frontend:
   ```bash
   cd lms-frontend
   npm install
   npm run dev
   ```
6. Open `http://localhost:5173` in a browser.

## API Documentation

A Postman collection covering all API endpoints can be found at
[docs/LMS.postman_collection.json](docs/LMS.postman_collection.json).

## Tests
Backend unit tests can be executed with:
```bash
cd lms-backend
mvn test
```

## License
Educational use only under NTUC LearningHub guidance.
