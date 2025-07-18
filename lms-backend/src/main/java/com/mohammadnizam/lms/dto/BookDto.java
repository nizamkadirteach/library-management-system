package com.mohammadnizam.lms.dto;

import com.mohammadnizam.lms.model.Book;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BookDto {
    private Integer bookId;
    private String isbn;
    private String title;
    private String author;
    private String category;
    private Integer publicationYear;
    private Integer copiesAvailable;
    private String status;

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
        dto.setStatus(book.getStatus());
        return dto;
    }
}
