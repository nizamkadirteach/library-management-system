package com.mohammadnizam.lms.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "books")
@Getter
@Setter
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

    private String status;
}
