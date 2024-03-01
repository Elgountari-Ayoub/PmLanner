package com.pm.backend.advice;

import com.pm.backend.exceptions.ResourceNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;

@ControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(Exception.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    public ResponseEntity<String> handleGenericException(Exception ex) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body( ex.getMessage());
    }
    @ExceptionHandler({
            ResourceNotFoundException.class,
    })
    public ResponseEntity<?> handleMemberNotFoundException(Exception ex) {
        String message = ex.getMessage();
        return new ResponseEntity<>(message, HttpStatus.NOT_FOUND);
    }
}
