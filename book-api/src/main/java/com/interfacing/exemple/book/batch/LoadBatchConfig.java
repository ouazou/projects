package com.interfacing.exemple.book.batch;

import com.interfacing.exemple.book.dao.BookRepository;
import com.interfacing.exemple.book.entities.Book;
import org.springframework.batch.core.Job;
import org.springframework.batch.core.Step;
import org.springframework.batch.core.configuration.annotation.EnableBatchProcessing;
import org.springframework.batch.core.configuration.annotation.JobBuilderFactory;
import org.springframework.batch.core.configuration.annotation.StepBuilderFactory;
import org.springframework.batch.core.launch.support.RunIdIncrementer;
import org.springframework.batch.item.ItemReader;
import org.springframework.batch.item.ItemWriter;
import org.springframework.batch.item.file.FlatFileItemReader;
import org.springframework.batch.item.file.mapping.DefaultLineMapper;
import org.springframework.batch.item.file.mapping.FieldSetMapper;
import org.springframework.batch.item.file.transform.DelimitedLineTokenizer;
import org.springframework.batch.item.file.transform.FieldSet;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.ClassPathResource;
import org.springframework.validation.BindException;

import javax.transaction.Transactional;
import java.net.MalformedURLException;
import java.util.List;
import java.util.function.Consumer;

/**
 * Created by zouarab on 2016-12-20.
 */
@Configuration
@EnableBatchProcessing
public class LoadBatchConfig {

    @Autowired
    public JobBuilderFactory jobBuilderFactory;

    @Autowired
    public StepBuilderFactory stepBuilderFactory;

    @Autowired
    BookRepository bookRepository;


    @Bean
    public Job job() throws MalformedURLException {
        return jobBuilderFactory.get("job")
                .incrementer(new RunIdIncrementer())
                .flow(step1())
                .end()
                .build();
    }

    @Bean
    public Step step1() throws MalformedURLException {
        return stepBuilderFactory.get("step1")
                .<Book, Book>chunk(10000)
                .reader(reader())
                .writer(new ItemWriter<Book>() {
                    @Override
                    @org.springframework.transaction.annotation.Transactional
                    public void write(List<? extends Book> list) throws Exception {
                        list.stream().forEach(new Consumer<Book>() {
                            @Override
                            public void accept(Book book) {
                                System.out.println("-- done ! --");
                                bookRepository.save(book);
                            }
                        });
                    }
                })
                .build();
    }


    @Bean
    public ItemReader<Book> reader() throws MalformedURLException {
        FlatFileItemReader<Book> reader = new FlatFileItemReader<Book>();
        reader.setResource(new ClassPathResource("csv/books.csv"));
        reader.setLineMapper(new DefaultLineMapper<Book>() {{
            setLineTokenizer( delimitedLineTokenizer());
            setFieldSetMapper(new FieldSetMapper() {
                @Override
                public Book mapFieldSet(FieldSet fieldSet) throws BindException {
                    return new Book(
                            fieldSet.readString(0),
                            fieldSet.readString(1),
                            fieldSet.readString(2),
                            fieldSet.readInt(3),
                            fieldSet.readInt(4),
                            fieldSet.readInt(5)
                    );
                }
            });
        }});
        return reader;
    }

    @Bean
    public  DelimitedLineTokenizer delimitedLineTokenizer(){

        DelimitedLineTokenizer lineTokenizer =new DelimitedLineTokenizer();
        lineTokenizer.setNames(new String[]{"title","author","genre","pages","pubYear","rating"});
        return lineTokenizer;
    }
}
