package com.interfacing.exemple.book;

import com.interfacing.exemple.book.batch.LoadBatchConfig;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

@SpringBootApplication
@EnableSwagger2
@ComponentScan
@Configuration
@Import(LoadBatchConfig.class)
public class BookApiApplication {

	public static void main(String[] args) {

		SpringApplication.run(BookApiApplication.class, args);
	}
}
