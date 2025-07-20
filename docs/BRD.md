# 📄 Business Requirements Document (BRD) – Library Management System

**Project Title:** Library Management System (LMS)  
**Course:** Full Stack Web Development – Capstone  
**Developer:** Mohammad Nizam Bin Abdul Kadir  
**Date:** 18 July 2025

---

## 1. Executive Summary

The LMS is a full-stack web application that automates and streamlines core library operations such as managing users, books, and borrow/return transactions. The system enhances operational efficiency, reduces manual errors, and improves the user experience for both librarians and members.

---

## 2. Business Objectives

- 📚 Automate book inventory management and borrowing workflows  
- 👤 Allow user registration, login, and role-based access  
- 🛠 Provide admin functionalities for librarians to manage users and books  
- ⏰ Enforce lending rules and overdue tracking  
- 📈 Enhance library service delivery with real-time system interactions  

---

## 3. Project Scope

- **Role-based system:** Librarian (Admin) and Member (User)

- **Functionalities include:**
  - User authentication  
  - Book CRUD (Create, Read, Update, Delete)  
  - Member registration and search  
  - Borrow/return/reserve operations  
  - Overdue tracking and fine calculation  

---

## 4. Stakeholders

| Role         | Name / Group               | Responsibilities                          |
|--------------|----------------------------|-------------------------------------------|
| Developer    | Mohammad Nizam Bin Abdul Kadir | Full-stack development of LMS             |
| Trainer      | Archana Sakpal             | Project oversight and assessment           |
| Admin User   | Librarian                  | Manage inventory and members               |
| End User     | Library Member             | Borrow/search/view books                   |

---

## 5. Assumptions

- Users have internet access and modern browsers  
- System deployed on a web server or localhost  
- User data and books stored securely in MySQL  

---

## 6. Business Rules

- Maximum of 3 books per member  
- 14-day loan duration, with a maximum of 2 renewals  
- $0.50/day fine, capped at $20 per book  
- No borrowing if user has overdue items or more than $10 in fines  

---

