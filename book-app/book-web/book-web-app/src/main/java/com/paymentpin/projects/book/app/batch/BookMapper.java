package com.paymentpin.projects.book.app.batch;

/**
 * Created by ouazou on 27/02/16.
 */
public class BookMapper {

    private String title;
    private String author;
    private String genre;
    private int pages;
    private int pubYear;
    private int rating;

    public BookMapper() {
    }

    public BookMapper(String title, String author, String genre, int pages, int pubYear, int rating) {
        this.title = title;
        this.author = author;
        this.genre = genre;
        this.pages = pages;
        this.pubYear = pubYear;
        this.rating = rating;
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
