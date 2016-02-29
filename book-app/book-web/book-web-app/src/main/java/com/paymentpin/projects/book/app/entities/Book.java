package com.paymentpin.projects.book.app.entities;
import javax.persistence.*;

/**
 * Created by ouazou on 20/02/16.
 */
@Entity
@Table(name = "books")
public  class Book {
    @Id @GeneratedValue(strategy = GenerationType.AUTO)
    private Long bookId;

    @Column(nullable = false,length = 250)
    private String title;
    @Column(nullable = false,length = 100)
    private String author;
    @Column(nullable = false,length = 100)
    private String genre;
    private int pages;
    private int pubYear;
    private int rating;

    public Book() {
        this.author = author;
    }

    public Book(String title, String author, String genre, int pages, int pubYear, int rating) {
        this.title      = title;
        this.author     = author;
        this.genre      = genre;
        this.pages      = pages;
        this.pubYear    = pubYear;
        this.rating     = rating;
    }

    public Long getBookId() {
        return bookId;
    }

    public void setBookId(Long bookId) {
        this.bookId = bookId;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public String getGenre() {
        return genre;
    }

    public void setGenre(String genre) {
        this.genre = genre;
    }

    public int getPages() {
        return pages;
    }

    public void setPages(int pages) {
        this.pages = pages;
    }

    public int getPubYear() {
        return pubYear;
    }

    public void setPubYear(int pubYear) {
        this.pubYear = pubYear;
    }

    public int getRating() {
        return rating;
    }

    public void setRating(int rating) {
        this.rating = rating;
    }
}
