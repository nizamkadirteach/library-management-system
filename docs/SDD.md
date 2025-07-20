# 🛠️ System Design Document – Library Management System

**Project Title:** Library Management System (LMS)  
**Developer:** Mohammad Nizam Bin Abdul Kadir  
**Course:** Full Stack Web Development – Capstone  
**Date:** 18 July 2025  

---

## 📘 Table of Contents

1. [System Overview](#1-system-overview)  
2. [Architecture Design](#2-architecture-design)  
3. [Entity Relationship Diagram (ERD)](#3-entity-relationship-diagram-erd)  
4. [API Design](#4-api-design)  
5. [UI Wireframes / Mockups](#5-ui-wireframes--mockups)  
6. [Component Interaction Flow](#6-component-interaction-flow)  
7. [Deployment Overview](#7-deployment-overview)  

---

## 1. System Overview

The LMS is designed to allow librarians to manage books and members efficiently and for users to search, borrow, and return books. The system includes authentication, role-based access, overdue fine handling, and real-time book tracking.

---

## 2. Architecture Design

**Architecture Type:** MVC (Model-View-Controller)  

**Technology Stack:**
- **Frontend:** React.js (using Hooks, Axios, React Router)  
- **Backend:** Java Spring Boot (RESTful APIs)  
- **Database:** MySQL (relational DB with proper indexing and constraints)  
- **Security:** JWT for token-based auth, Spring Security  

**Architecture Diagram:**
[React UI] <--Axios--> [Spring Boot REST API] <--JPA--> [MySQL DB]
|
[Spring Security + JWT]


---

## 3. Entity Relationship Diagram (ERD)

**Entities and Relationships (Text Version):**
- `users` (`user_id` PK)  
- `books` (`book_id` PK)  
- `members` (`member_id` PK, FK to `users.user_id`)  
- `borrow_transactions` (`transaction_id` PK, FK to `books`, FK to `members`)  
- `reservations` (`reservation_id` PK, FK to `books`, FK to `members`)  

---

## 4. API Design

| Endpoint                 | Method | Role    | Description           |
|--------------------------|--------|---------|------------------------|
| /api/auth/register       | POST   | All     | User registration      |
| /api/auth/login          | POST   | All     | User login             |
| /api/books               | GET    | All     | View/search books      |
| /api/books               | POST   | Admin   | Add new book           |
| /api/books/{id}          | PUT    | Admin   | Update book            |
| /api/books/{id}          | DELETE | Admin   | Delete book            |
| /api/members             | GET    | Admin   | View members           |
| /api/borrow              | POST   | Member  | Borrow a book          |
| /api/return              | POST   | Member  | Return a book          |
| /api/reserve             | POST   | Member  | Reserve a book         |
| /api/fines               | GET    | Member  | View fine total        |

**Note:** Authentication is handled via JWT in the `Authorization` header for protected endpoints.

---

## 5. UI Wireframes / Mockups

Suggested screens:
- **Login Page**  
- **Admin Dashboard** (Book & Member management)  
- **User Portal** (Book search, borrow history)  

---

## 6. Component Interaction Flow

**Example: Book Borrowing Workflow**
1. Member logs in → React sends JWT  
2. Member selects a book → Sends `POST` to `/api/borrow`  
3. Backend validates:
   - Book availability  
   - Member fine limit  
4. Backend records transaction in `borrow_transactions` table  
5. UI updates book status  

---

## 7. Deployment Overview

**Development Environment:**
- Run backend: `./mvnw spring-boot:run`  
- Run frontend: `npm start`  
- MySQL running locally on port `3306`  

**GitHub Repository:**  
🔗 [https://github.com/nizamkadirteach/library-management-system](https://github.com/nizamkadirteach/library-management-system)  
- Source code versioned with Git  
- Includes README with setup and run instructions  
