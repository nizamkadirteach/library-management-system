package com.mohammadnizam.lms.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "books")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Book {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "book_id")
    private Integer bookId;

    private String isbn;
    private String title;
    private String author;
    private String category;

    @Column(name = "publication_year")
    private Integer publicationYear;

    @Column(name = "copies_available")
    private Integer copiesAvailable;

    @Enumerated(EnumType.STRING)
    private BookStatus status;
}
