/*
package com.interfacing.exemple.book.dao;

import com.github.springtestdbunit.DbUnitTestExecutionListener;
import com.github.springtestdbunit.annotation.DatabaseSetup;
import com.interfacing.exemple.book.entities.Book;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.TestExecutionListeners;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.support.DependencyInjectionTestExecutionListener;
import org.springframework.test.context.transaction.TransactionalTestExecutionListener;

import javax.transaction.Transactional;
import java.util.List;

*/
/**
 * Created by ZOuarab1 on 2/23/2016.
 *//*


@RunWith(SpringJUnit4ClassRunner.class)
@Transactional
@TestExecutionListeners({ DependencyInjectionTestExecutionListener.class,
        TransactionalTestExecutionListener.class,
        DbUnitTestExecutionListener.class })
public class BookRepositoryTest {

    @Autowired
    BookRepository repository;

    @org.junit.Test
    public void testFindByTitle() throws Exception {

        Book book=new Book("title", "author", "genre", 250, 2016,3);
        repository.save(book);
        List<Book> book2fetch=repository.findByTitle("title");
        Assert.assertEquals(1,book2fetch.size());

    }




    @Test
    @DatabaseSetup("/database/books.xml")
    public void testStore() throws Exception {

        List<Book> book2fetch=repository.findByTitle("Recontre du troisieme type");
        Assert.assertEquals(1,book2fetch.size());

    }



}*/
