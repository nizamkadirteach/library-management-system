package com.mohammadnizam.lms.repository;

import com.mohammadnizam.lms.model.Book;
import com.mohammadnizam.lms.model.BookStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BookRepository extends JpaRepository<Book, Integer> {
    List<Book> findByStatusOrCategory(BookStatus status, String category);
}
