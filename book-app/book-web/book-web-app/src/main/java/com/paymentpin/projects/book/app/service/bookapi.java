package com.paymentpin.projects.book.app.service;

import com.paymentpin.projects.book.app.dao.BookRepository;
import com.paymentpin.projects.book.app.entities.Book;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collection;

/**
 * Created by ouazou on 20/02/16.
 */
@Service
@Transactional
public class bookapi {
    @Autowired
    private BookRepository bRepository;

    public Collection<Book> getAll() {
        return bRepository.findAll();
    }

}
