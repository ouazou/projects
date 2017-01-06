package com.interfacing.exemple.book.service;

import static org.springframework.hateoas.mvc.ControllerLinkBuilder.linkTo;
import static org.springframework.hateoas.mvc.ControllerLinkBuilder.methodOn;

import com.interfacing.exemple.book.dao.BookRepository;
import com.interfacing.exemple.book.entities.Book;
import com.interfacing.exemple.book.mappers.BookMapper;
import com.interfacing.exemple.book.model.BookResource;
import com.interfacing.exemple.book.utils.ApiConstant;
import io.swagger.annotations.Api;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.*;
import org.springframework.hateoas.ExposesResourceFor;
import org.springframework.hateoas.Resource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by zouarab on 2016-12-20.
 */
@RestController
@ExposesResourceFor(BookResource.class)
@Transactional
@Api(value = "Book API")
public class BookController {

    @Autowired
    BookRepository bookRepository;


    @RequestMapping(value = "/books", method = RequestMethod.GET)
    @ResponseStatus(HttpStatus.OK)
    Resource<Page<BookResource>> findPerPages
            (
                    @RequestParam(defaultValue = "0") int page,
                    @RequestParam(defaultValue = "10") int size,
                    @RequestParam(required = false) String sort,
                    @RequestParam(required = false) String fields

            ) {
        Pageable pageRequest = definePageRequest(page, size, sort);
        Page<Book> entityPage = bookRepository.findAll(pageRequest);
        List<BookResource> dtos = BookMapper.INSTANCE.mapList(entityPage.getContent());
        Page<BookResource> pages = new PageImpl<>(dtos, pageRequest, entityPage.getTotalElements());

        Resource resource=new Resource<Page<BookResource>>(pages);
        resource.add(linkTo(methodOn(BookController.class).findPerPages(0,size,sort,fields)).withRel("First"));
        resource.add(linkTo(methodOn(BookController.class).findPerPages(pages.getTotalPages()-1,size,sort,fields)).withRel("Last"));

        int i=page;
        int loop=5;
        while (i--!=0 && loop--!=0 ){

        }
        for (int j = i; i <page ; i++) {
            String linkLabel=Integer.toString(i);
            resource.add(linkTo(methodOn(BookController.class).findPerPages(i,size,sort,fields)).withRel(linkLabel));
        }
        i=page;
        loop=5;
        while (i++!=pages.getTotalPages()-1 && loop--!=0 ){

        }
        for (int j = i; i <pages.getTotalPages() ; i++) {
            String linkLabel=Integer.toString(i);
            resource.add(linkTo(methodOn(BookController.class).findPerPages(i,size,sort,fields)).withRel(linkLabel));
        }


        return resource;

    }

    private Pageable definePageRequest(int page, int size, String sortFields) {

        Sort sort = null;

        if (StringUtils.isNotBlank(sortFields)) {
            List<Sort.Order> sortOrder = new ArrayList<>();
            for (String sortField : sortFields.split(ApiConstant.FIELD_SEPARATOR)) {

                if (StringUtils.startsWith(sortField, ApiConstant.SORT_ORDER_DIRECTION_ASC)) {
                    sortOrder.add(new Sort.Order(Sort.Direction.ASC, sortField.substring(1)));
                } else if (StringUtils.startsWith(sortField, ApiConstant.SORT_ORDER_DIRECTION_DESC)) {
                    sortOrder.add(new Sort.Order(Sort.Direction.DESC, sortField.substring(1)));
                }
                ;

            }
            if (sortOrder.size() != 0) {
                sort = new Sort(sortOrder);
            }

        }

        if (sort == null)
            return new PageRequest(page, size);
        else
            return new PageRequest(page, size, sort);
    }

    @RequestMapping(value = "/books/list", method = RequestMethod.GET)
    @ResponseStatus(HttpStatus.OK)
    List<BookResource> list
            (
                    @RequestParam(required = false) String fields

            ) {

        List<Book> entityPage = bookRepository.findAll();
        List<BookResource> dtos = BookMapper.INSTANCE.mapList(entityPage);

        return dtos;

    }


    @RequestMapping(value = "/books", method = RequestMethod.POST)
    @ResponseStatus(HttpStatus.CREATED)
    ResponseEntity<BookResource> create(@RequestBody BookResource bookResource) {

        Book book = bookRepository.save(BookMapper.INSTANCE.bookModelToBook(bookResource));

        return new ResponseEntity<BookResource>(BookMapper.INSTANCE.bookToBookModel(book), HttpStatus.CREATED);
    }

    @RequestMapping(value = "/books/{bookId}", method = RequestMethod.GET)
    @ResponseStatus(HttpStatus.OK)
    ResponseEntity<Resource<BookResource>> findByBookId
            (
                    @PathVariable( "bookId" )Long booId
            ) {

        Book book = bookRepository.findOne(booId);
        BookResource dtos = BookMapper.INSTANCE.bookToBookModel(book);
        Resource<BookResource> resource=new Resource<>(dtos);

        resource.add(linkTo(methodOn(BookController.class).findByBookId(booId)).withSelfRel());
        return new ResponseEntity<Resource<BookResource>>(resource,HttpStatus.OK);

    }


}
