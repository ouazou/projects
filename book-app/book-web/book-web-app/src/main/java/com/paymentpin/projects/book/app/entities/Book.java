package com.paymentpin.projects.book.app.entities;

import org.hibernate.annotations.BatchSize;
import org.hibernate.annotations.LazyCollection;
import org.hibernate.annotations.LazyCollectionOption;
import org.hibernate.annotations.Proxy;

import javax.persistence.*;
import java.util.List;

/**
 * Created by ouazou on 20/02/16.
 */
@Entity
@Table(name = "books")
@Proxy(lazy = false)
@BatchSize(size = 100)
public class Book {
    private Long bookId;
    private String title;
    private String author;
    private String genre;
    private int pages;
    private int pubYear;
    private int rating;
    private List<Student> students;

    public Book() {
        this.author = author;
    }

    public Book(String title, String author, String genre, int pages, int pubYear, int rating) {
        this.title = title;
        this.author = author;
        this.genre = genre;
        this.pages = pages;
        this.pubYear = pubYear;
        this.rating = rating;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    public Long getBookId() {
        return bookId;
    }

    public void setBookId(Long bookId) {
        this.bookId = bookId;
    }

    @Column(nullable = false, length = 100)
    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    @Column(nullable = false, length = 100)
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

    @Column(nullable = false, length = 250)
    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    @ManyToMany(fetch = FetchType.LAZY,targetEntity =Student.class, mappedBy = "books")
    public List<Student> getStudents() {
        return students;
    }

    public void setStudents(List<Student> students) {
        this.students = students;
    }

    @Override
    public String toString() {
        return "Book{" +
                "bookId=" + bookId +
                ", title='" + title + '\'' +
                ", author='" + author + '\'' +
                ", genre='" + genre + '\'' +
                ", pages=" + pages +
                ", pubYear=" + pubYear +
                ", rating=" + rating +
                ", students=" + students +
                '}';
    }
}

