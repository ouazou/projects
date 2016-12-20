package com.interfacing.exemple.book;

import com.interfacing.exemple.book.dao.BookRepository;
import com.interfacing.exemple.book.entities.Book;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * Created by zouarab on 2016-12-20.
 */
@RestController()
public class BookController {

    @Autowired
    BookRepository bookRepository;

    @RequestMapping(value="/books", method = RequestMethod.GET)
    @ResponseStatus(HttpStatus.OK)

    List<Book> characters() {
        return bookRepository.findAll();
    }
}
