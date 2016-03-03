package com.paymentpin.projects.book.rest.api;

import com.paymentpin.service.contract.BookMessage;
import com.sun.istack.internal.NotNull;
import org.springframework.validation.annotation.Validated;

import javax.ws.rs.Consumes;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

/**
 * Created by ZOuarab1 on 2/29/2016.
 */

@Validated
@Path("/")
@Produces({MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML})
@Consumes({MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML})
public interface IbooksRestService {

    public BookMessage getBookById(@Valid @NotNull @Min(0) @PathParam("bookId") final Long bookId);
    public BookMessage getBookByTitle(Long bookId);
    public BookMessage getBookAll(Long bookId);
    public void addBook(BookMessage bookMessage);
    public void updateBook(BookMessage bookMessage);
    public void  delete(Long bookId);




}
