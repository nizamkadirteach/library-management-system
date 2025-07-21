# UAT Scenarios & Test Cases – Library Management System (LMS)

**Project Title:** Library Management System (LMS)  
**Developer:** Mohammad Nizam Bin Abdul Kadir  
**Date:** 21 July 2025  

---

## 1. Introduction

### 1.1 Purpose of this Document

This document provides structured User Acceptance Testing (UAT) scenarios for the LMS. The goal is to validate that all key features meet business requirements and are functional before going live.

### 1.2 How to Use this Guide

- Use the designated test accounts.
- Follow the steps under each scenario.
- Compare actual behavior with **Expected Results**.
- Mark validations and capture screenshots where necessary.

---

## 2. Test Accounts

| Role   | Username       | Password | Description                                 |
|--------|----------------|----------|---------------------------------------------|
| Member | `user_3books`  | admin123 | Has already borrowed 3 books.               |
| Member | `user_fined12` | admin123 | Has overdue book + $12 fine.               |
| Member | `user_reserved`| admin123 | Has reserved one book (unavailable).        |
| Member | `user_on_time` | admin123 | 1 borrowed book, not overdue, no fines.     |
| Admin  | `admin_main`   | admin123  | Full system administrator access.           |

---

## 3. Member Test Scenarios

### 📘 Scenario 1: Borrowing Limit Reached

- **User Account:** `user_3books`
- **Objective:** Confirm enforcement of 3-book borrowing limit.

**Steps:**
1. Log in as `user_3books`
2. Go to **My Borrowed Books**
3. Search for any available book
4. Attempt to borrow it

**Expected Results:**
- Borrowed books list shows 3 entries.
- Borrow action is blocked (disabled button or error message).

**What to Validate:**
- [ ] System blocks borrowing beyond 3 books  
- [ ] UI clearly shows restriction

---

### 💰 Scenario 2: Borrowing Blocked Due to Fines

- **User Account:** `user_fined12`
- **Objective:** Prevent users with fines > $10 from borrowing

**Steps:**
1. Log in as `user_fined12`
2. View **My Fines**
3. Search and try borrowing a book

**Expected Results:**
- Fine total displayed as $12.00  
- Borrow action blocked or shows message

**What to Validate:**
- [ ] Fine correctly calculated  
- [ ] Borrowing blocked due to fine  
- [ ] UI provides clear feedback

---

### 🔖 Scenario 3: Book Reservation

- **User Account:** `user_reserved`
- **Objective:** Confirm reservation feature works for unavailable books

**Steps:**
1. Log in as `user_reserved`
2. Go to **My Reservations**
3. Optionally, search for reserved book

**Expected Results:**
- Reservation appears with status "Pending"  
- Book status shown as "Reserved" or "Unavailable"

**What to Validate:**
- [ ] Reservation system functions  
- [ ] Status tracked correctly  
- [ ] UI accurately reflects book availability

---

### 😊 Scenario 4: Standard User Experience

- **User Account:** `user_on_time`
- **Objective:** Validate default user flow with no errors or fines

**Steps:**
1. Log in as `user_on_time`
2. Visit **My Borrowed Books** and **My Fines**

**Expected Results:**
- 1 book borrowed, not overdue  
- Fine total = $0.00

**What to Validate:**
- [ ] Borrowed book appears correctly  
- [ ] No fines displayed

---

## 4. Admin Test Scenario

### 🛠️ Scenario 5: Full Admin Access & Management

- **User Account:** `admin_main`
- **Objective:** Test administrator's full access rights

**Steps:**
1. Log in as `admin_main`
2. View **Manage Members** and **Track Overdue**
3. Go to **Manage Books**

**Expected Results:**
- Members listed with borrow count and fines  
- `user_fined12` shown in overdue list  
- Book list editable (CRUD: Edit, Delete)

**What to Validate:**
- [ ] Admin dashboard is functional  
- [ ] Member stats are visible  
- [ ] Overdue tracking works  
- [ ] Full book management access

---

## 5. Optional Final Checks

- [ ] **Responsive Design:** App adapts to mobile screens  
- [ ] **Session Persistence:** Remain logged in on refresh (JWT)  
- [ ] **UI Display:** Correct user name, role, and logout button

---
