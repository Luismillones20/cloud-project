package com.example.historial.Dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;
import lombok.Setter;

import java.util.Date;

@Data
public class ShowExamenDTO {
    @JsonFormat
    private String pacienteId;
    @JsonFormat
    private String especialidad;
    @JsonFormat
    private String diagnostico;
    @JsonFormat
    private String medicoId;
    @JsonFormat
    private String citaId;
    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss'Z'", timezone = "UTC")
    private Date fecha;

    public ShowExamenDTO() {
    }
    public ShowExamenDTO(String pacienteId, String diagnostico, String especialidad, String medicoId, String citaId) {
        this.pacienteId = pacienteId;
        this.diagnostico = diagnostico;
        this.especialidad = especialidad;
        this.medicoId = medicoId;
        this.citaId = citaId;
    }
    public String getPacienteId() {
        return pacienteId;
    }

    public void setPacienteId(String pacienteId) {
        this.pacienteId = pacienteId;
    }

    public String getDiagnostico() {
        return diagnostico;
    }

    public void setDiagnostico(String diagnostico) {
        this.diagnostico = diagnostico;
    }

    public String getEspecialidad() {
        return especialidad;
    }

    public void setEspecialidad(String especialidad) {
        this.especialidad = especialidad;
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
}

