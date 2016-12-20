package com.interfacing.exemple.book.dao;

import com.interfacing.exemple.book.BookApiApplication;
import com.interfacing.exemple.book.entities.Book;
import com.interfacing.exemple.book.entities.Student;
import org.junit.runner.RunWith;
import org.springframework.batch.core.Job;
import org.springframework.batch.core.JobExecution;
import org.springframework.batch.core.JobParameters;
import org.springframework.batch.core.launch.JobLauncher;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.SpringApplicationConfiguration;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ContextConfiguration;
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
    StudentRepository strepo;

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
        Student student1=new Student("John Bickel-1");
        Student student2=new Student("John Bickel-2");
        Student student3=new Student("John Bickel-3");
        Student student4=new Student("John Bickel-4");


        student1.getBooks().add(book2fetch.get(0));
        student2.getBooks().add(book2fetch.get(0));
        student3.getBooks().add(book2fetch.get(0));
        student4.getBooks().add(book2fetch.get(0));
        student1.getBooks().add(book2fetch.get(1));
        student1.getBooks().add(book2fetch.get(2));
        strepo.save(student1);
        strepo.save(student2);
        strepo.save(student3);
        strepo.save(student4);

        book2fetch=repository.findAll();

        System.out.println(book2fetch.get(0).getStudents().size());




    }
}
