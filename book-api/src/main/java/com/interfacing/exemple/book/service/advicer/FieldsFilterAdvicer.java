package com.interfacing.exemple.book.service.advicer;

import com.fasterxml.jackson.databind.ser.impl.SimpleBeanPropertyFilter;
import com.fasterxml.jackson.databind.ser.impl.SimpleFilterProvider;
import com.interfacing.exemple.book.service.BookController;
import com.interfacing.exemple.book.utils.ApiConstant;
import org.apache.commons.lang3.StringUtils;
import org.springframework.core.MethodParameter;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJacksonValue;
import org.springframework.http.server.ServerHttpRequest;
import org.springframework.http.server.ServerHttpResponse;
import org.springframework.http.server.ServletServerHttpRequest;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.servlet.mvc.method.annotation.AbstractMappingJacksonResponseBodyAdvice;

/**
 * Created by zouarab on 2017-01-06.
 */
@RestControllerAdvice(assignableTypes = BookController.class)
public class FieldsFilterAdvicer extends AbstractMappingJacksonResponseBodyAdvice {

    @Override
    protected void beforeBodyWriteInternal(MappingJacksonValue bodyContainer, MediaType contentType, MethodParameter returnType,
                                           ServerHttpRequest req, ServerHttpResponse res) {
        ServletServerHttpRequest request = (ServletServerHttpRequest)req;
        String fields= request.getServletRequest().getParameter(ApiConstant.SERVLET_REQUEST_PARAMETER_FIELDS);
        if(StringUtils.isNotBlank(fields)){
            bodyContainer.setFilters(new SimpleFilterProvider().addFilter(ApiConstant.JSON_FILTERS_BOOK_RESOURCE, SimpleBeanPropertyFilter.filterOutAllExcept(fields.split(","))));
        }
        else{
            bodyContainer.setFilters(new SimpleFilterProvider().addFilter(ApiConstant.JSON_FILTERS_BOOK_RESOURCE, SimpleBeanPropertyFilter.serializeAll()));
        }

    }
}