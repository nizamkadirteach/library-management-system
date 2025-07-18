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

library-management-system/
├── backend/
│   ├── src/
│   │   └── main/
│   │       └── java/
│   │           └── com/
│   │               └── lms/
│   │                   ├── controller/
│   │                   ├── model/
│   │                   ├── repository/
│   │                   ├── service/
│   │                   ├── config/
│   │                   └── LibraryManagementApplication.java
│   ├── resources/
│   │   ├── application.properties
│   │   └── static/
│   └── pom.xml
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── App.js
│   │   └── index.js
│   ├── package.json
│   └── .env
├── sql/
│   ├── create_tables.sql
│   ├── insert_sample_data.sql
│   └── erd_diagram.png
├── README.md
└── .gitignore



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
