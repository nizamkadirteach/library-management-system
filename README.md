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

## Project Documentation
Detailed project documents are provided in the `docs/` directory:

- **[Business Requirements Document](docs/BRD.md)** – outlines the overall objectives and business rules.
- **[Software Requirements Specification](docs/SRS.md)** – lists functional and non‑functional requirements.
- **[System Design Document](docs/SDD.md)** – describes the architecture and API design.

Consult these files for deeper context on features, architecture and implementation choices.

## Repository Structure
- `lms-backend/` – Spring Boot backend application
- `lms-frontend/` – React frontend
- `sql/` – Database creation scripts

## Setup
1. Create the database `lms_db` and run `sql/create_tables.sql`.
2. Configure a JWT secret in `lms-backend/src/main/resources/application.properties`.
   The repo includes a default example using a 256‑bit value encoded in Base64:
   ```properties
   jwt.secret=90kP5GCZOPt6+AlZn+xJSCrjXVoD6EwOKY7G0dI3WS0=
   ```
   Replace this with your own secret (generate with `openssl rand -base64 32`).
   If a registration attempt uses an existing username, the API returns `409 Conflict`.
   
   Configure the email server for overdue notifications in the same file:
   ```properties
   spring.mail.host=smtp.example.com
   spring.mail.port=587
   spring.mail.username=user@example.com
   spring.mail.password=secret
   mail.from=library@example.com
   ```

3. Seed sample data with hashed passwords (required for default logins):

   Run the SQL script to populate members and an admin account:
   ```bash
   mysql -u root -p lms_db < sql/insert_sample_data.sql
   ```
   The default admin credentials are `admin/admin123`. If you skip seeding,
   create an admin user manually before logging in.

   To load additional demo users, run:
   ```bash
   mysql -u root -p lms_db < sql/insert_demo_data.sql
   ```
   This script adds sample accounts like `user_3books` for testing.
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
7. For a production build of the React app:
   ```bash
   npm run build
   npm run preview
   ```

The backend includes a daily scheduled job that calculates overdue fines and
sends email reminders to members with outstanding items.

## API Documentation

A Postman collection covering all API endpoints can be found at
[docs/LMS.postman_collection.json](docs/LMS.postman_collection.json).
Interactive Swagger UI documentation is available once the backend is running at
`http://localhost:8081/swagger-ui.html`.

## Application Screenshots

The `screenshots` folder contains captures of key LMS workflows.
Below is a gallery illustrating how the application looks in action.

![Homepage - Desktop](screenshots/Homepage%20-%20Desktop.png)

![Homepage - Mobile](screenshots/Homepage%20-%20Mobile.png)

![Homepage - Search Books - Result](screenshots/Homepage%20-%20Search%20Books%20-%20Result.png)

![Login Page](screenshots/Login%20Page.png)

![Register Page](screenshots/Register%20Page.png)

![Member Dashboard - Login Redirect](screenshots/Member%20Dashboard%20-%20Login%20Redirect.png)

![Member Dashboard - My Borrowed Books](screenshots/Member%20Dashboard%20-%20My%20Borrowed%20Books.png)

![Member Dashboard - My Fines](screenshots/Member%20Dashboard%20-%20My%20Fines.png)

![Member Dashboard - My Reservations](screenshots/Member%20Dashboard%20-%20My%20Reservations.png)

![Member Dashboard - Search - Results](screenshots/Member%20Dashboard%20-%20Search%20-%20Results.png)

![Member Dashboard - Search Books](screenshots/Member%20Dashboard%20-%20Search%20Books.png)

![Member Dashboard - Borrowing History](screenshots/Member%20Dashboard%20-%20Borrowing%20History.png)

![Admin Dashboard - Borrow:Reserve Logs - Reservations](screenshots/Admin%20Dashboard%20-%20Borrow%3AReserve%20Logs%20-%20Reservations.png)

![Admin Dashboard - Borrow:Reserve Logs](screenshots/Admin%20Dashboard%20-%20Borrow%3AReserve%20Logs.png)

![Admin Dashboard - Login Redirect](screenshots/Admin%20Dashboard%20-%20Login%20Redirect.png)

![Admin Dashboard - Manage Books - Add Book](screenshots/Admin%20Dashboard%20-%20Manage%20Books%20-%20Add%20Book.png)

![Admin Dashboard - Manage Books - Edit Book](screenshots/Admin%20Dashboard%20-%20Manage%20Books%20-%20Edit%20Book.png)

![Admin Dashboard - Manage Books](screenshots/Admin%20Dashboard%20-%20Manage%20Books.png)

![Admin Dashboard - Manage Members - Add Member](screenshots/Admin%20Dashboard%20-%20Manage%20Members%20-%20Add%20Member.png)

![Admin Dashboard - Manage Members - Edit Member](screenshots/Admin%20Dashboard%20-%20Manage%20Members%20-%20Edit%20Member.png)

![Admin Dashboard - Manage Members](screenshots/Admin%20Dashboard%20-%20Manage%20Members.png)

![Borrow Limit Scenario - Member Dashboard](screenshots/%20Borrow%20Limit%20Scenario%20-%20Member%20Dashboard.png)

![Borrow Limit Scenario - Failed To Borrow](screenshots/Borrow%20Limit%20Scenario%20-%20Failed%20To%20Borrow.png)

![Borrow Limit Scenario - My Borrowed Books](screenshots/Borrow%20Limit%20Scenario%20-%20My%20Borrowed%20Books.png)

![Clean User with On-Time Borrow - My Borrowed Books](screenshots/Clean%20User%20with%20On-Time%20Borrow%20-%20My%20Borrowed%20Books.png)

![Clean User with On-Time Borrow - My Fines](screenshots/Clean%20User%20with%20On-Time%20Borrow%20-%20My%20Fines.png)

![Fines > $10 Scenario - Member Dashboard](screenshots/Fines%20%3E%20%2410%20Scenario%20-%20Member%20Dashboard.png)

![Fines > $10 Scenario - My Fines](screenshots/Fines%20%3E%20%2410%20Scenario%20-%20My%20Fines.png)

![Reservation Scenario - My Reservations](screenshots/Reservation%20Scenario%20-%20My%20Reservations.png)

![Reservation Scenario - Search Books - Book Borrowed - Reserved](screenshots/Reservation%20Scenario%20-%20Search%20Books%20-%20Book%20Borrowed%20-%20Reserved.png)

## Tests
Backend unit tests can be executed with:
```bash
cd lms-backend
mvn test
```

## License
Educational use only under NTUC LearningHub guidance.
