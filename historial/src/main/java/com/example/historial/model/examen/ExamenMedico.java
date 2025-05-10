package com.example.historial.model.examen;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

@Document(collection = "historiales")
public class ExamenMedico {

    @Id
    private String idExamen;

    @JsonFormat
    @NotBlank(message = "El pacienteId es obligatorio")
    private String pacienteId;

    @JsonFormat
    @NotBlank(message = "El ID del médico es obligatorio")
    private String medicoId;

    @JsonFormat
    @NotBlank(message = "El ID de la cita es obligatorio")
    private String citaId;

    @JsonFormat
    @NotBlank(message = "La especialidad es obligatoria")
    private String especialidad;

    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss'Z'", timezone = "UTC")
    @NotNull(message = "La fecha de solicitud es obligatoria")
    private Date fechaSolicitud;

    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss'Z'", timezone = "UTC")
    private Date fechaRealizacion;

    @JsonFormat
    @NotBlank(message = "El diagnóstico es obligatorio")
    private String diagnostico;

    // Constructor vacío
    public ExamenMedico() {
    }

    // Constructor completo
    public ExamenMedico(String idExamen, String pacienteId, String medicoId, String citaId,
                        String especialidad, Date fechaSolicitud, Date fechaRealizacion,
                        String diagnostico) {
        this.idExamen = idExamen;
        this.pacienteId = pacienteId;
        this.medicoId = medicoId;
        this.citaId = citaId;
        this.especialidad = especialidad;
        this.fechaSolicitud = fechaSolicitud;
        this.fechaRealizacion = fechaRealizacion;
        this.diagnostico = diagnostico;
    }

    // Getters y Setters
    public String getIdExamen() {
        return idExamen;
    }

    public void setIdExamen(String idExamen) {
        this.idExamen = idExamen;
    }

    public String getPacienteId() {
        return pacienteId;
    }

    public void setPacienteId(String pacienteId) {
        this.pacienteId = pacienteId;
    }

    public String getMedicoId() {
        return medicoId;
    }

    public void setMedicoId(String medicoId) {
        this.medicoId = medicoId;
    }

    public String getCitaId() {
        return citaId;
    }

    public void setCitaId(String citaId) {
        this.citaId = citaId;
    }

    public String getEspecialidad() {
        return especialidad;
    }

    public void setEspecialidad(String especialidad) {
        this.especialidad = especialidad;
    }

    public Date getFechaSolicitud() {
        return fechaSolicitud;
    }

    public void setFechaSolicitud(Date fechaSolicitud) {
        this.fechaSolicitud = fechaSolicitud;
    }

    public Date getFechaRealizacion() {
        return fechaRealizacion;
    }

    public void setFechaRealizacion(Date fechaRealizacion) {
        this.fechaRealizacion = fechaRealizacion;
    }

    public String getDiagnostico() {
        return diagnostico;
    }

    public void setDiagnostico(String diagnostico) {
        this.diagnostico = diagnostico;
    }

}
