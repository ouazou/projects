package com.paymentpin.projects.book.app.dao;

import com.github.springtestdbunit.DbUnitTestExecutionListener;
import com.github.springtestdbunit.annotation.DatabaseSetup;
import com.paymentpin.projects.book.app.entities.Address;
import com.paymentpin.projects.book.app.entities.Book;
import com.paymentpin.projects.book.app.entities.Course;
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

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Query;
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
    CourseRepository courseRepository;

    @Autowired
    JobLauncher jobLauncher;
    @Autowired
    Job job;

    @Autowired
    EntityManagerFactory factory;

    @org.junit.Test
    public void testFindByTitle() throws Exception {

        try {

            JobExecution execution = jobLauncher.run(job, new JobParameters());
            System.out.println("Exit Status : " + execution.getStatus());

        } catch (Exception e) {
            e.printStackTrace();
        }

        EntityManager em = factory.createEntityManager();



        List<Book> book2fetch=repository.findByTitle("title1");
        System.out.println(book2fetch.size());

        Student student1=new Student("John Bickel-1");
        Course course=new Course("Metric of IT systems");
        courseRepository.save(course);

        student1.getBooks().add(book2fetch.get(0));
        student1.setAddress(new Address(10,"dubuisson","longueuil"));
        strepo.save(student1);
        course=courseRepository.findByTitle("Metric of IT systems").get(0);
        course.getStudents().add(student1);
        courseRepository.save(course);

        Query q = em.createQuery("FROM com.paymentpin.projects.book.app.entities.Book book left join fetch book.students st left join fetch st.course");

        book2fetch=q.getResultList();

       /* System.out.println(book2fetch.get(0).getStudents().size());
        System.out.println(book2fetch.get(0).getStudents().get(0));
        System.out.println(book2fetch.get(0).getStudents().get(0).getBooks().size());
        System.out.println(book2fetch.get(0).getStudents().get(0).getCourse().toString());
*/
        System.out.println(book2fetch.get(0).getStudents().get(0).getAddress().toString());


        course=courseRepository.findByTitle("Metric of IT systems").get(0);

    }
}
