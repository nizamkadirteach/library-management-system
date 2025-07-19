package com.mohammadnizam.lms.repository;

import com.mohammadnizam.lms.model.Book;
import com.mohammadnizam.lms.model.BookStatus;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
class BookRepositoryTest {

    @Autowired
    private BookRepository bookRepository;

    @Test
    void findByTitleContainingIgnoreCase_returnsMatches() {
        Book book = new Book();
        book.setIsbn("987");
        book.setTitle("Spring Boot Guide");
        book.setAuthor("John");
        book.setCategory("Tech");
        book.setPublicationYear(2024);
        book.setCopiesAvailable(2);
        book.setStatus(BookStatus.AVAILABLE);
        book = bookRepository.save(book);

        List<Book> results = bookRepository.findByTitleContainingIgnoreCase("spring");
        assertThat(results).extracting(Book::getBookId).contains(book.getBookId());
    }
}
