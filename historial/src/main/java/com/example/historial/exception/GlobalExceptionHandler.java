package com.example.historial.exception;

import jakarta.validation.ConstraintViolationException;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.mongodb.UncategorizedMongoDbException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.server.ResponseStatusException;

import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {

  @ExceptionHandler(ResponseStatusException.class)
  public ResponseEntity<Map<String, Object>> handleResponseStatusException(ResponseStatusException ex) {
    Map<String, Object> response = new HashMap<>();
    response.put("status", ex.getStatusCode().value());
    response.put("error", HttpStatus.valueOf(ex.getStatusCode().value()).name());
    response.put("message", ex.getReason());
    return new ResponseEntity<>(response, ex.getStatusCode());
  }

  @ExceptionHandler(RecursoNoEncontradoException.class)
  public ResponseEntity<String> manejarRecursoNoEncontrado(RecursoNoEncontradoException ex) {
    return new ResponseEntity<>(ex.getMessage(), HttpStatus.NOT_FOUND);
  }

  @ExceptionHandler(MethodArgumentNotValidException.class)
  public ResponseEntity<Map<String, String>> manejarErroresValidacion(MethodArgumentNotValidException ex) {
    Map<String, String> errores = new HashMap<>();
    ex.getBindingResult().getFieldErrors().forEach(error ->
            errores.put(error.getField(), error.getDefaultMessage()));
    return new ResponseEntity<>(errores, HttpStatus.BAD_REQUEST);
  }

  @ExceptionHandler(ConstraintViolationException.class)
  public ResponseEntity<String> handleConstraintViolationException(ConstraintViolationException ex) {
    return new ResponseEntity<>(ex.getMessage(), HttpStatus.BAD_REQUEST);
  }

  @ExceptionHandler(UncategorizedMongoDbException.class)
  public ResponseEntity<String> handleMongoException(UncategorizedMongoDbException ex) {
    return new ResponseEntity<>("Error al conectar con la base de datos", HttpStatus.SERVICE_UNAVAILABLE);
  }

  @ExceptionHandler(DataIntegrityViolationException.class)
  public ResponseEntity<String> handleDataIntegrityViolationException(DataIntegrityViolationException ex) {
    return new ResponseEntity<>("Violación de integridad de datos", HttpStatus.CONFLICT);
  }

  @ExceptionHandler(HttpMessageNotReadableException.class)
  public ResponseEntity<String> manejarJsonMalFormado(HttpMessageNotReadableException ex) {
    return new ResponseEntity<>("JSON inválido o campo con formato incorrecto", HttpStatus.BAD_REQUEST);
  }

  @ExceptionHandler(Exception.class)
  public ResponseEntity<String> manejarErroresGenerales(Exception ex) {
    return new ResponseEntity<>("Error interno del servidor: " + ex.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
  }

}
