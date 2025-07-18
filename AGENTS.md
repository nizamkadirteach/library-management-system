# AGENTS.md — Capstone LMS Context

This repo is the backend for a full-stack Library Management System built with Spring Boot and MySQL.

## MySQL Schema Source
Refer to `sql/create_tables.sql` — this is the **ground truth schema**.

## Entity Expectations
All entity classes must reflect table structure in `create_tables.sql`.
Do NOT auto-generate mismatched fields or default values.

## Setup Instructions
- Java 21
- Spring Boot 3.5+
- MySQL 9+ running locally (`lms_db`)
- Run with: `./mvnw spring-boot:run`

## How to Run Tests
- Unit: `mvn test`
- Integration: TBD

## Prompt Guidance
- Use DTOs if exposing entities via API
- Validate fields against DB types (e.g., no `String` for `int`)
- Check controller endpoints for REST compliance
