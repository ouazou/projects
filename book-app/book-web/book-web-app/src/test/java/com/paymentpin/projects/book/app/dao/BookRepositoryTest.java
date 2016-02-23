package com.paymentpin.projects.book.app.dao;

import com.paymentpin.projects.book.app.entities.Book;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

/**
 * Created by ZOuarab1 on 2/23/2016.
 */

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration("classpath:/conf/application-conf.xml")
public class BookRepositoryTest {

    @Autowired
    BookRepository repository;

    @org.junit.Test
    public void testFindByTitle() throws Exception {

        Book book=new Book("title", "author", "genre", 250, 2016,3);
        repository.save(book);

    }

}