package com.interfacing.exemple.book;

import com.fasterxml.jackson.databind.ser.FilterProvider;
import com.fasterxml.jackson.databind.ser.impl.SimpleBeanPropertyFilter;
import com.fasterxml.jackson.databind.ser.impl.SimpleFilterProvider;
import com.interfacing.exemple.book.dao.BookRepository;
import com.interfacing.exemple.book.entities.Book;
import com.interfacing.exemple.book.mappers.BookMapper;
import com.interfacing.exemple.book.model.BookResource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.json.MappingJacksonValue;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;


import java.util.List;
import java.util.Optional;

/**
 * Created by zouarab on 2016-12-20.
 */
@RestController()
@Transactional
public class BookController {

    @Autowired
    BookRepository bookRepository;

    @RequestMapping(value = "/books/list", method = RequestMethod.GET)
    @ResponseStatus(HttpStatus.OK)
    List<BookResource> findall() {

        return BookMapper.INSTANCE.mapList(bookRepository.findAll());
    }

    @RequestMapping(value = "/books", method = RequestMethod.GET)
    @ResponseStatus(HttpStatus.OK)
    Page<BookResource> findPerPages
            (
            @RequestParam(defaultValue = "0") Optional<Integer> page,
            @RequestParam Optional<Integer> size,
            @RequestParam(required = false) String fields

            ) {
        Pageable pageRequest = new PageRequest(page.get(), size.get());
        Page<Book> entityPage = bookRepository.findAll(pageRequest);
        List<BookResource> dtos = BookMapper.INSTANCE.mapList(entityPage.getContent());


        MappingJacksonValue mappingJacksonValue = new MappingJacksonValue(dtos);
        FilterProvider filters = new SimpleFilterProvider()
                .addFilter("com.interfacing.exemple.book.model.BookResource", SimpleBeanPropertyFilter
                        .filterOutAllExcept(fields.split(",")));
        mappingJacksonValue.setFilters(filters);
        System.out.println(mappingJacksonValue.getValue());
        Page<BookResource> pages=new PageImpl<>((List<BookResource>)mappingJacksonValue.getValue(), pageRequest, entityPage.getTotalElements());

        return pages;

    }


    @RequestMapping(value = "/books", method = RequestMethod.POST)
    @ResponseStatus(HttpStatus.CREATED)
    ResponseEntity<BookResource> create(@RequestBody BookResource bookResource) {

        Book book = bookRepository.save(BookMapper.INSTANCE.bookModelToBook(bookResource));

        return new ResponseEntity<BookResource>(BookMapper.INSTANCE.bookToBookModel(book), HttpStatus.CREATED);
    }

}
