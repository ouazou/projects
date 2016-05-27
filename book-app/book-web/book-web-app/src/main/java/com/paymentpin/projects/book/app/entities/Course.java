package com.paymentpin.projects.book.app.entities;

import org.hibernate.annotations.*;

import javax.persistence.*;
import javax.persistence.Entity;
import javax.persistence.Table;
import java.util.ArrayList;
import java.util.Collection;
import java.util.HashSet;
import java.util.Set;

/**
 * Created by zouarab on 5/17/2016.
 */
@Entity
@Table(name = "courses")
@Proxy(lazy = false)
public class Course {
    private Long id;
    private String title;
    private Set<Student> students;

    public Course() {
    }

    public Course(String title) {
        this.title = title;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "courseId")
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    @Column(name = "title", length =150)
    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    @OneToMany(targetEntity =Student.class,mappedBy ="course")
    @ElementCollection()
    @LazyCollection(LazyCollectionOption.FALSE)
    @Fetch(FetchMode.JOIN)
    @BatchSize(size =100)
    @Cascade({})
    public Set<Student> getStudents() {
        if(students==null)
            students=new HashSet<>();
        return students;
    }

    public void setStudents(Set<Student> students) {
        this.students = students;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        Course course = (Course) o;

        if (!id.equals(course.id)) return false;
        return title.equals(course.title);

    }

    @Override
    public int hashCode() {
        int result = id.hashCode();
        result = 31 * result + title.hashCode();
        return result;
    }

    @Override
    public String toString() {
        return "Course{" +
                "id=" + id +
                ", title='" + title + '\'' +
                '}';
    }
}
