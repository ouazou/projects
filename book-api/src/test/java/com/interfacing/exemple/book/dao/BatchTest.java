package com.interfacing.exemple.book.dao;

import com.interfacing.exemple.book.BookApiApplication;
import com.interfacing.exemple.book.entities.Book;
import org.junit.runner.RunWith;
import org.springframework.batch.core.Job;
import org.springframework.batch.core.JobExecution;
import org.springframework.batch.core.JobParameters;
import org.springframework.batch.core.launch.JobLauncher;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.SpringApplicationConfiguration;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import java.util.List;

/**
 * Created by ZOuarab1 on 2/23/2016.
 */

@RunWith(SpringJUnit4ClassRunner.class)
@SpringApplicationConfiguration(classes = BookApiApplication.class)
@SpringBootTest
public class BatchTest {

    @Autowired
    BookRepository repository;

    @Autowired
    JobLauncher jobLauncher;
    @Autowired
    Job job;

    @org.junit.Test
    public void testFindByTitle() throws Exception {

        try {

            JobExecution execution = jobLauncher.run(job, new JobParameters());
            System.out.println("Exit Status : " + execution.getStatus());

        } catch (Exception e) {
            e.printStackTrace();
        }

        List<Book> book2fetch=repository.findAll();
        System.out.println(book2fetch.size());






    }
}
