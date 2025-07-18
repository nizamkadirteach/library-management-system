# 📚 Library Management System (LMS) – Capstone Project

> Developed as part of the Full Stack Web Development Programme at NTUC LearningHub.

## 🧠 Overview

The **Library Management System (LMS)** is a full-stack web application designed to streamline library operations and enhance user experience. It supports two user roles: **Librarian (Admin)** and **Member**.

The system allows librarians to manage books and members, while members can search, borrow, return books, and track their borrowing history.

---

## 🚀 Features

### 👤 User Management
- User registration and login (JWT-based)
- Role-based access: Admin vs Member
- Profile management and password reset

### 📚 Book Management (Admin)
- Add, update, and delete books
- View availability, categories, and reservation status

### 🙋 Member Management
- Register, edit, or delete member profiles
- Search members by name or ID
- View borrowing history

### 📦 Lending Management
- Borrow and return books
- Reserve books
- Automatic fine calculation for overdue books
- Max 3 books per member, 14-day loan, 2 renewals

---

## 🛠️ Tech Stack

| Layer      | Technology                   |
|------------|------------------------------|
| Frontend   | React, React Router, Axios, Bootstrap |
| Backend    | Spring Boot, JPA/Hibernate, Spring Security |
| Database   | MySQL (ERD included)         |
| Auth       | JWT Token-based authentication |
| Tools      | Git, Postman, VS Code        |

---

## 🗂️ Folder Structure

The project is organised into the following main directories:

backend/ – Contains the Spring Boot backend application.

controller/ – REST API endpoints like BookController.java.

service/ – Business logic classes like BookService.java.

repository/ – JPA repository interfaces for database access.

model/ – Entity classes mapped to MySQL tables.

config/ – Security configuration (e.g., JWT, WebSecurityConfig).

LibraryManagementApplication.java – Spring Boot main class.

resources/ – Includes application.properties and static resources.

frontend/ – React frontend application.

components/ – UI elements like navigation bars and book cards.

pages/ – Page-level views like LoginPage and AdminDashboard.

services/ – API service calls using Axios.

App.js, index.js – React entry and routing.

public/ – Static assets.

package.json – Frontend project dependencies.

sql/ – SQL-related files.

create_tables.sql – Script to create MySQL tables.

insert_sample_data.sql – Example data for testing.

erd_diagram.png – Entity Relationship Diagram (ERD) image.

Project root files:

README.md – Project documentation.

.gitignore – Git exclusions.

docs/ – (Optional) BRD, SRS, and user manual.




---

## ⚙️ Setup Instructions

1. Clone this repo
2. Start MySQL and import the provided SQL scripts
3. Run the backend (Spring Boot): `./mvnw spring-boot:run`
4. Start the frontend (React): `npm start`
5. Open in browser: `http://localhost:3000`

---

## 💡 Screenshots

_Add screenshots of:_
- Admin Dashboard
- Book Management
- Member Borrowing History
- Login/Register Forms

---

## 📑 License

This project is built for educational purposes only under NTUC LearningHub Capstone guidance.
