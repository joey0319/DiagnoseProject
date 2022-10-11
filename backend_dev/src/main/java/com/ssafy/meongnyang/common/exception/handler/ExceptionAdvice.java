package com.ssafy.meongnyang.common.exception.handler;

import com.ssafy.meongnyang.common.exception.*;
import com.ssafy.meongnyang.common.model.Response;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class ExceptionAdvice {

    @ExceptionHandler(CommentNotFoundException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public Response<?> commentNotFoundException(CommentNotFoundException e) {
        return new Response<>(false, 400, e.getMessage(), null);
    }

    @ExceptionHandler(DiagnoseNotFoundException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public Response<?> diagnoseNotFoundException(DiagnoseNotFoundException e) {
        return new Response<>(false, 400, e.getMessage(), null);
    }

    @ExceptionHandler(LostNotFoundException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public Response<?> lostNotFoundException(LostNotFoundException e) {
        return new Response<>(false, 400, e.getMessage(), null);
    }

    @ExceptionHandler(ShowPetNotFoundException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public Response<?> showPetNotFoundException(ShowPetNotFoundException e) {
        return new Response<>(false, 400, e.getMessage(), null);
    }

    @ExceptionHandler(UserNotFoundException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public Response<?> userNotFoundException(UserNotFoundException e) {
        return new Response<>(false, 400, e.getMessage(), null);
    }

    @ExceptionHandler(TokenNotFoundException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public Response<?> tokenNotFoundException(TokenNotFoundException e) {
        return new Response<>(false, 400, e.getMessage(), null);
    }

}
