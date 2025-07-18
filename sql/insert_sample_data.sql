-- Sample data for 'users' table
INSERT INTO users (username, password, role) VALUES
('admin', 'admin123', 'ADMIN'),
('alice', 'alice123', 'MEMBER'),
('bob', 'bob123', 'MEMBER'),
('charlie', 'charlie123', 'MEMBER');

-- Sample data for 'members' table
INSERT INTO members (user_id, full_name, address, contact_info, membership_start, membership_end) VALUES
(2, 'Alice Tan', '123 Orchard Road', 'alice@example.com', '2025-01-01', NULL),
(3, 'Bob Lim', '456 Clementi Ave', 'bob@example.com', '2025-01-15', NULL),
(4, 'Charlie Goh', '789 Tampines St', 'charlie@example.com', '2025-02-01', NULL);

-- Sample data for 'books' table
INSERT INTO books (isbn, title, author, category, publication_year, copies_available, status) VALUES
('978-1234567890', 'Introduction to Java', 'John Doe', 'Programming', 2020, 5, 'AVAILABLE'),
('978-1617292545', 'Spring Boot in Action', 'Craig Walls', 'Programming', 2016, 3, 'AVAILABLE'),
('978-0133970777', 'Database Systems', 'C.J. Date', 'Database', 2014, 4, 'AVAILABLE');

-- Sample data for 'borrow_records' table
INSERT INTO borrow_records (member_id, book_id, borrow_date, due_date, return_date, fine) VALUES
(1, 1, '2025-07-01', '2025-07-15', '2025-07-10', 0.00),
(2, 2, '2025-07-02', '2025-07-16', NULL, 0.00),
(3, 3, '2025-07-03', '2025-07-17', NULL, 0.00);
