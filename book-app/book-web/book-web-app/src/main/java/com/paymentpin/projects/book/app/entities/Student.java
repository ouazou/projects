package com.paymentpin.projects.book.app.entities;

import org.hibernate.annotations.*;

import javax.persistence.*;
import javax.persistence.Entity;
import javax.persistence.ForeignKey;
import javax.persistence.Table;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by zouarab on 5/13/2016.
 */
@Entity
@Table(name = "students")
public class Student {
    String name;
    private Long id;
    private List<Book> books;
    private Course course;

    public Student() {
    }

    public Student(String name) {
        this.name = name;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "sudentId")
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }


    @ManyToMany(targetEntity = Book.class)
    @JoinTable(
            name = "prets",
            joinColumns = @JoinColumn(
                    name = "studentId",
                    foreignKey = @ForeignKey(name = "FK-PRETS-STUDENTS")
            ),
            inverseJoinColumns = @JoinColumn(
                    name = "bookId",
                    foreignKey = @ForeignKey(name = "FK-PRETS-BOOKS")
            )
    )
    @LazyCollection(LazyCollectionOption.FALSE)
    @Fetch(FetchMode.JOIN)
    @BatchSize(size = 10)
    public List<Book> getBooks() {
        if(books==null)
            books=new ArrayList<>();
        return books;
    }

    public void setBooks(List<Book> books) {
        this.books = books;
    }

    @ManyToOne(targetEntity = Course.class)
    @JoinColumn(
            name = "courseId",
            foreignKey = @ForeignKey(name = "FK-COURSE-STUDENT")
    )
    public Course getCourse() {
        return course;
    }

    public void setCourse(Course course) {
        this.course = course;
    }

    @Column(name = "name", length =150,nullable = false)
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @Override
    public String toString() {
        return "Student{" +
                "name='" + name + '\'' +
                ", id=" + id +
                '}';
    }
}
