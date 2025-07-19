INSERT INTO users (username, password, role, created_at) VALUES ('seeduser', 'pass', 'MEMBER', CURRENT_TIMESTAMP);
INSERT INTO members (user_id, full_name, address, contact_info, membership_start, membership_end) VALUES (1, 'Seed Member', '123 Street', '123456', CURRENT_DATE, CURRENT_DATE);
INSERT INTO books (isbn, title, author, category, publication_year, copies_available, status) VALUES ('ISBN-1', 'Seed Book One', 'Author A', 'Fiction', 2023, 5, 'AVAILABLE');
INSERT INTO books (isbn, title, author, category, publication_year, copies_available, status) VALUES ('ISBN-2', 'Seed Book Two', 'Author B', 'Non-Fiction', 2024, 3, 'AVAILABLE');
