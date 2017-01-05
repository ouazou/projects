package com.interfacing.exemple.book.model;

import com.fasterxml.jackson.annotation.JsonFilter;

import javax.validation.constraints.NotNull;
import javax.xml.bind.annotation.XmlRootElement;

/**
 * Created by zouarab on 2017-01-04.
 */
@XmlRootElement
@JsonFilter("com.interfacing.exemple.book.model.BookModel")
public class BookModel {
    @NotNull
    private Long bookId;
    @NotNull
    private String title;
    @NotNull
    private String author;
    @NotNull
    private String genre;
    private int pages;
    private int pubYear;
    private int rating;

    public Long getBookId() {
        return bookId;
    }

    public void setBookId(Long bookId) {
        this.bookId = bookId;
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
