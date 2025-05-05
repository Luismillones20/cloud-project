package com.example.historial.ErrorDto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Map;

@Data
@AllArgsConstructor
public class ErrorDto {
    private String timestamp;
    private int status;
    private String error;
    private String message;
    private Map<String, String> errors;
}
