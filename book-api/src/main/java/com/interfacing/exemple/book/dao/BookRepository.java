package com.interfacing.exemple.book.dao;

import com.interfacing.exemple.book.entities.Book;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Created by ZOuarab1 on 2/22/2016.
 */
@Repository
public interface BookRepository extends PagingAndSortingRepository<Book, Long> {

    public List<Book> findByTitle(String title);
    public List<Book> findAll();

}