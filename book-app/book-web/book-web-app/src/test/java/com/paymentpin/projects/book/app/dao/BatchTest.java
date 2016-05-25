package com.paymentpin.projects.book.app.dao;

import com.github.springtestdbunit.DbUnitTestExecutionListener;
import com.github.springtestdbunit.annotation.DatabaseSetup;
import com.paymentpin.projects.book.app.entities.Book;
import com.paymentpin.projects.book.app.entities.Student;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.batch.core.Job;
import org.springframework.batch.core.JobExecution;
import org.springframework.batch.core.JobParameters;
import org.springframework.batch.core.launch.JobLauncher;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.TestExecutionListeners;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.support.DependencyInjectionTestExecutionListener;
import org.springframework.test.context.transaction.TransactionalTestExecutionListener;

import javax.transaction.Transactional;
import java.util.List;

/**
 * Created by ZOuarab1 on 2/23/2016.
 */

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration("classpath:/conf/application-conf-test.xml")
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
