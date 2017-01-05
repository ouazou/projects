package com.interfacing.exemple.book.mappers;

import com.interfacing.exemple.book.entities.Book;
import com.interfacing.exemple.book.model.BookResource;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

import java.util.List;

/**
 * Created by zouarab on 2017-01-05.
 */
@Mapper
public interface BookMapper {

    BookMapper INSTANCE= Mappers.getMapper(BookMapper.class);

    BookResource bookToBookModel(Book book);

    Book bookModelToBook(BookResource bookResource);

    List<BookResource>  mapList(List<Book> list);

}
