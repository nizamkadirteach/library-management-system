-- Sample data for 'users' table
INSERT INTO users (username, password, role) VALUES
('admin', 'admin123', 'ADMIN'),
('staff1', 'staff123', 'MEMBER'),
('member1', 'pass123', 'MEMBER');

-- Sample data for 'members' table
INSERT INTO members (name, email, phone) VALUES
('Alice Tan', 'alice@example.com', '81234567'),
('Bob Lim', 'bob@example.com', '87654321'),
('Charlie Goh', 'charlie@example.com', '82345678');

-- Sample data for 'books' table
INSERT INTO books (title, author, isbn, available_copies) VALUES
('Introduction to Java', 'John Doe', '978-1234567890', 5),
('Spring Boot in Action', 'Craig Walls', '978-1617292545', 3),
('Database Systems', 'C.J. Date', '978-0133970777', 4);

-- Sample data for 'borrow_records' table
INSERT INTO borrow_records (user_id, book_id, borrow_date, return_date) VALUES
(1, 1, '2025-07-01', '2025-07-15'),
(2, 2, '2025-07-02', NULL),
(3, 3, '2025-07-03', NULL);
