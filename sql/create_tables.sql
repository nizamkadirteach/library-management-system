
-- Create the database
CREATE DATABASE IF NOT EXISTS lms_db;
USE lms_db;

-- Users table (Admin and Members login)
CREATE TABLE users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role ENUM('ADMIN', 'MEMBER') NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Members table (library membership details)
CREATE TABLE members (
    member_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    full_name VARCHAR(100),
    address VARCHAR(255),
    contact_info VARCHAR(100),
    membership_start DATE,
    membership_end DATE,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

-- Books table
CREATE TABLE books (
    book_id INT AUTO_INCREMENT PRIMARY KEY,
    isbn VARCHAR(20) UNIQUE,
    title VARCHAR(200),
    author VARCHAR(100),
    category VARCHAR(50),
    publication_year INT,
    copies_available INT DEFAULT 1,
    status ENUM('AVAILABLE', 'BORROWED', 'RESERVED') DEFAULT 'AVAILABLE'
);

-- Borrow records table
CREATE TABLE borrow_records (
    record_id INT AUTO_INCREMENT PRIMARY KEY,
    member_id INT,
    book_id INT,
    borrow_date DATE,
    due_date DATE,
    return_date DATE,
    fine DECIMAL(5,2) DEFAULT 0.00,
    FOREIGN KEY (member_id) REFERENCES members(member_id),
    FOREIGN KEY (book_id) REFERENCES books(book_id)
);
