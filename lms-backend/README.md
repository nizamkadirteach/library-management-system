# LMS Backend

This module contains the Spring Boot application for the **Library Management System**.

## Requirements
- Java 21
- Spring Boot 3.5+
- MySQL 9+ with a database named `lms_db`

## Setup
1. Ensure MySQL is running and execute `../sql/create_tables.sql` to create tables.
2. Set a JWT signing secret in `src/main/resources/application.properties`:
   ```properties
   jwt.secret=BASE64_ENCODED_SECRET
   ```
   You can generate one with `openssl rand -base64 32`.
   Configure the SMTP settings for email notifications in the same file.
3. Run the application:
   ```bash
   ./mvnw spring-boot:run
   ```
4. The API will be available at `http://localhost:8081/api/`.
   Swagger UI is exposed at `http://localhost:8081/swagger-ui.html`.

## Common Endpoints
- `POST /api/auth/register` – user registration
- `POST /api/auth/login` – user login
- `GET /api/books` – search and list books
- `POST /api/books` – add a book (admin)
- `PUT /api/books/{id}` – update a book (admin)
- `DELETE /api/books/{id}` – delete a book (admin)
- `POST /api/borrow` – borrow a book
- `POST /api/return` – return a book

Authentication for protected routes uses JWT tokens in the `Authorization` header.

## Scheduled Tasks
Overdue fines are recalculated each night at midnight and email reminders are
sent via the `NotificationService`.

## Tests
Run unit tests with:
```bash
mvn test
```

Entity classes mirror the tables defined in `sql/create_tables.sql`. Use DTOs when exposing data via the API and validate fields to match database types.
