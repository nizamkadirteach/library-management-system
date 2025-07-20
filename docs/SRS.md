# 📘 Software Requirements Specification (SRS) – Library Management System

**Project Title:** Library Management System (LMS)  
**Developer:** Mohammad Nizam Bin Abdul Kadir  
**Course:** Full Stack Web Development – Capstone  
**Date:** 18 July 2025  

---

## 📑 Table of Contents

1. [Introduction](#1-introduction)  
2. [Functional Requirements](#2-functional-requirements)  
3. [Non-Functional Requirements](#3-non-functional-requirements)  
4. [System Features](#4-system-features)  
5. [External Interface Requirements](#5-external-interface-requirements)  
6. [Constraints](#6-constraints)  
7. [Assumptions and Dependencies](#7-assumptions-and-dependencies)  

---

## 1. Introduction

### 1.1 Purpose  
This document describes the functional and non-functional requirements for the Library Management System (LMS), a web application that supports book tracking, user authentication, borrowing, returning, and overdue management.

### 1.2 Intended Audience  
- Developers  
- Assessors  
- Project stakeholders  
- End users (librarians, members)

### 1.3 Technologies Used  
- **Backend:** Java (Spring Boot)  
- **Frontend:** React.js  
- **Database:** MySQL  
- **Tools:** Git, Axios, Postman, Bootstrap  

---

## 2. Functional Requirements

| ID   | Requirement              | Description |
|------|--------------------------|-------------|
| FR1  | User Registration/Login  | System allows new users to register and existing users to log in |
| FR2  | Role Management          | Distinguishes between Admin (Librarian) and Member (User) |
| FR3  | Book CRUD                | Admin can add, update, delete, and view books |
| FR4  | Book Search              | Users can search and filter books by title, author, category |
| FR5  | Borrow/Return            | Users can borrow and return books with due dates enforced |
| FR6  | Reserve Book             | Users can reserve currently unavailable books |
| FR7  | Overdue Notification     | System sends or displays alerts for overdue items |
| FR8  | Fine Calculation         | System calculates fines for overdue books |

---

## 3. Non-Functional Requirements

| NFR ID | Requirement   | Description |
|--------|---------------|-------------|
| NFR1   | Usability     | The system must be easy to navigate for all user roles |
| NFR2   | Performance   | Pages should load in under 2 seconds under normal load |
| NFR3   | Security      | Passwords stored encrypted, JWT used for secure access |
| NFR4   | Maintainability | Code should follow standard style guide (Java, React) |
| NFR5   | Availability  | System should handle concurrent users without crashing |

---

## 4. System Features

- **Authentication:** Registration, login, JWT token management  
- **User Role Handling:** Separate views and controls for Admin vs Member  
- **Book Management:** CRUD operations by Admin  
- **Search & Filters:** Real-time search for books by various criteria  
- **Borrowing Logic:** Enforce business rules, due dates, limits  
- **Fine System:** $0.50 per day fine up to $20 max  
- **Notification:** UI alert for overdue books  

---

## 5. External Interface Requirements

| Interface Type | Description |
|----------------|-------------|
| REST APIs (Backend) | Exposes endpoints for frontend consumption (CRUD, auth, etc.) |
| MySQL DB (Database) | Stores users, books, transactions, reservations |
| React UI (Frontend) | Dynamic and responsive user interface for both roles |
| JWT (Security) | Used to authenticate and authorize users via token headers |

---

## 6. Constraints

- Must use Spring Boot for backend and React for frontend  
- MySQL only (no other databases permitted)  
- The project must follow coding standards provided (no wildcard imports, use Lombok, camelCase variables, etc.)  

---

## 7. Assumptions and Dependencies

- Assumes a consistent internet connection  
- Deployment on localhost unless otherwise specified  
- Functional integration between frontend and backend via API  
- Trainer/assessor will evaluate the presentation and submission based on completeness and quality  

---
