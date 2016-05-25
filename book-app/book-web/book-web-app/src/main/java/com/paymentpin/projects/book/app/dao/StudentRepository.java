package com.paymentpin.projects.book.app.dao;

import com.paymentpin.projects.book.app.entities.Book;
import com.paymentpin.projects.book.app.entities.Student;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Created by ZOuarab1 on 2/22/2016.
 */
@Repository
public interface StudentRepository extends CrudRepository<Student, Long> {


    public List<Student> findAll();

}