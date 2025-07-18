package com.mohammadnizam.lms.dto;

import com.mohammadnizam.lms.model.Book;

public class BookDto {
    private Integer bookId;
    private String isbn;
    private String title;
    private String author;
    private String category;
    private Integer publicationYear;
    private Integer copiesAvailable;
    private String status;

    public BookDto() {
    }

    public BookDto(Integer bookId, String isbn, String title, String author, String category,
                   Integer publicationYear, Integer copiesAvailable, String status) {
        this.bookId = bookId;
        this.isbn = isbn;
        this.title = title;
        this.author = author;
        this.category = category;
        this.publicationYear = publicationYear;
        this.copiesAvailable = copiesAvailable;
        this.status = status;
    }

    public Integer getBookId() {
        return bookId;
    }

    public void setBookId(Integer bookId) {
        this.bookId = bookId;
    }

    public String getIsbn() {
        return isbn;
    }

    public void setIsbn(String isbn) {
        this.isbn = isbn;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public Integer getPublicationYear() {
        return publicationYear;
    }

    public void setPublicationYear(Integer publicationYear) {
        this.publicationYear = publicationYear;
    }

    public Integer getCopiesAvailable() {
        return copiesAvailable;
    }

    public void setCopiesAvailable(Integer copiesAvailable) {
        this.copiesAvailable = copiesAvailable;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public static BookDto fromEntity(Book book) {
        if (book == null) {
            return null;
        }
        BookDto dto = new BookDto();
        dto.setBookId(book.getBookId());
        dto.setIsbn(book.getIsbn());
        dto.setTitle(book.getTitle());
        dto.setAuthor(book.getAuthor());
        dto.setCategory(book.getCategory());
        dto.setPublicationYear(book.getPublicationYear());
        dto.setCopiesAvailable(book.getCopiesAvailable());
        if (book.getStatus() != null) {
            dto.setStatus(book.getStatus().name());
        }
        return dto;
    }
}
