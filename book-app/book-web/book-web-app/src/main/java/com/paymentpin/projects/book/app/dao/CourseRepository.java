package com.paymentpin.projects.book.app.dao;

import com.paymentpin.projects.book.app.entities.Book;
import com.paymentpin.projects.book.app.entities.Course;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Created by zouarab on 5/17/2016.
 */
@Repository
public interface CourseRepository  extends CrudRepository<Course, Long> {
    public List<Course> findByTitle(String title);
    public List<Course> findAll();
}
