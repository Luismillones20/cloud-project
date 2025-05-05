package com.example.historial.model.historial;
import jakarta. validation.constraints.NotBlank;
import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Document(collection = "historiales")
public class HistorialMedico {
    @Id
    private String id;

    @JsonFormat
    @NotBlank(message = "El pacienteId es obligatorio")
    private String pacienteId;

    @NotBlank(message = "El nombre del paciente es obligatorio")
    @JsonFormat
    private String nombrePaciente;

    @NotBlank(message = "El diagnóstico es obligatorio")
    @JsonFormat
    private String diagnostico;

    @NotNull(message = "Los síntomas son obligatorios")
    @JsonFormat
    private List<String> sintomas;

    @NotBlank(message = "El tipo de consulta es obligatorio")
    @JsonFormat
    private String tipoConsulta;

    @JsonFormat
    @NotBlank(message = "La especialidad es obligatoria")
    private String especialidad;

    @JsonFormat
    @NotBlank(message = "Las observaciones son obligatorias")
    private String observaciones;

    //@NotNull(message = "La fecha es obligatoria")
    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss'Z'", timezone = "UTC")
    private Date fecha;
}
