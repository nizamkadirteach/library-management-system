USE lms_db;

-- ###################################################
-- Users
-- ###################################################

-- Admin user
INSERT INTO users (username, password, role) VALUES
('admin_main', '$2b$12$D87ncK5xdIBLlfOJEDUSZeaunRDd1Dj1nJ8xqBEunO1RmIiij.N.O', 'ADMIN');
SET @admin_main_id = LAST_INSERT_ID();

-- Member 1: user_3books - 3 active borrowed books
INSERT INTO users (username, password, role) VALUES
('user_3books', '$2b$12$D87ncK5xdIBLlfOJEDUSZeaunRDd1Dj1nJ8xqBEunO1RmIiij.N.O', 'MEMBER');
SET @user_3books_uid = LAST_INSERT_ID();

-- Member 2: user_fined12 - overdue book with $12 fine
INSERT INTO users (username, password, role) VALUES
('user_fined12', '$2b$12$D87ncK5xdIBLlfOJEDUSZeaunRDd1Dj1nJ8xqBEunO1RmIiij.N.O', 'MEMBER');
SET @user_fined12_uid = LAST_INSERT_ID();

-- Member 3: user_reserved - reserved book unavailable
INSERT INTO users (username, password, role) VALUES
('user_reserved', '$2b$12$D87ncK5xdIBLlfOJEDUSZeaunRDd1Dj1nJ8xqBEunO1RmIiij.N.O', 'MEMBER');
SET @user_reserved_uid = LAST_INSERT_ID();

-- Member 4: user_on_time - active borrow, no fines
INSERT INTO users (username, password, role) VALUES
('user_on_time', '$2b$12$D87ncK5xdIBLlfOJEDUSZeaunRDd1Dj1nJ8xqBEunO1RmIiij.N.O', 'MEMBER');
SET @user_on_time_uid = LAST_INSERT_ID();

-- ###################################################
-- Members
-- ###################################################

INSERT INTO members (user_id, full_name, address, contact_info, membership_start, membership_end)
VALUES
(@user_3books_uid, 'Member Three Books', '123 Book Rd', 'user3@example.com', CURDATE(), NULL);
SET @member_3books_id = LAST_INSERT_ID();

INSERT INTO members (user_id, full_name, address, contact_info, membership_start, membership_end)
VALUES
(@user_fined12_uid, 'Member Fined', '456 Fine St', 'fined12@example.com', CURDATE(), NULL);
SET @member_fined12_id = LAST_INSERT_ID();

INSERT INTO members (user_id, full_name, address, contact_info, membership_start, membership_end)
VALUES
(@user_reserved_uid, 'Member Reserved', '789 Reserve Ave', 'reserved@example.com', CURDATE(), NULL);
SET @member_reserved_id = LAST_INSERT_ID();

INSERT INTO members (user_id, full_name, address, contact_info, membership_start, membership_end)
VALUES
(@user_on_time_uid, 'Member On Time', '1010 OnTime Blvd', 'ontime@example.com', CURDATE(), NULL);
SET @member_on_time_id = LAST_INSERT_ID();

-- ###################################################
-- Books
-- ###################################################

-- Book 1
INSERT INTO books (isbn, title, author, category, publication_year, copies_available, status)
VALUES ('DEMO-ISBN-1', 'Demo Book One', 'Author A', 'Fiction', 2021, 2, 'AVAILABLE');
SET @book1_id = LAST_INSERT_ID();

-- Book 2
INSERT INTO books (isbn, title, author, category, publication_year, copies_available, status)
VALUES ('DEMO-ISBN-2', 'Demo Book Two', 'Author B', 'Science', 2022, 2, 'AVAILABLE');
SET @book2_id = LAST_INSERT_ID();

-- Book 3
INSERT INTO books (isbn, title, author, category, publication_year, copies_available, status)
VALUES ('DEMO-ISBN-3', 'Demo Book Three', 'Author C', 'History', 2020, 2, 'AVAILABLE');
SET @book3_id = LAST_INSERT_ID();

-- Book 4
INSERT INTO books (isbn, title, author, category, publication_year, copies_available, status)
VALUES ('DEMO-ISBN-4', 'Demo Book Four', 'Author D', 'Technology', 2019, 1, 'AVAILABLE');
SET @book4_id = LAST_INSERT_ID();

-- Book 5 (all copies borrowed)
INSERT INTO books (isbn, title, author, category, publication_year, copies_available, status)
VALUES ('DEMO-ISBN-5', 'Demo Book Five', 'Author E', 'Mystery', 2023, 0, 'BORROWED');
SET @book5_id = LAST_INSERT_ID();

-- ###################################################
-- Borrow Records
-- ###################################################

-- user_3books: 3 active borrowed books
INSERT INTO borrow_records (member_id, book_id, borrow_date, due_date, return_date, fine)
VALUES
(@member_3books_id, @book1_id, DATE_SUB(CURDATE(), INTERVAL 10 DAY), DATE_ADD(DATE_SUB(CURDATE(), INTERVAL 10 DAY), INTERVAL 14 DAY), NULL, 0.00),
(@member_3books_id, @book2_id, DATE_SUB(CURDATE(), INTERVAL 8 DAY), DATE_ADD(DATE_SUB(CURDATE(), INTERVAL 8 DAY), INTERVAL 14 DAY), NULL, 0.00),
(@member_3books_id, @book3_id, DATE_SUB(CURDATE(), INTERVAL 5 DAY), DATE_ADD(DATE_SUB(CURDATE(), INTERVAL 5 DAY), INTERVAL 14 DAY), NULL, 0.00);

-- user_fined12: overdue book with $12 fine
INSERT INTO borrow_records (member_id, book_id, borrow_date, due_date, return_date, fine)
VALUES
(@member_fined12_id, @book4_id, DATE_SUB(CURDATE(), INTERVAL 25 DAY), DATE_ADD(DATE_SUB(CURDATE(), INTERVAL 25 DAY), INTERVAL 14 DAY), NULL, 12.00);

-- user_on_time: active borrow, no fines
INSERT INTO borrow_records (member_id, book_id, borrow_date, due_date, return_date, fine)
VALUES
(@member_on_time_id, @book2_id, DATE_SUB(CURDATE(), INTERVAL 3 DAY), DATE_ADD(DATE_SUB(CURDATE(), INTERVAL 3 DAY), INTERVAL 14 DAY), NULL, 0.00);

-- ###################################################
-- Reservations
-- ###################################################

-- user_reserved: book unavailable, placed a reservation
INSERT INTO reservations (member_id, book_id, reservation_date, status)
VALUES
(@member_reserved_id, @book5_id, CURDATE(), 'ACTIVE');

