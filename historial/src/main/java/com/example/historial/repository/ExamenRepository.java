package com.example.historial.repository;

import com.example.historial.model.examen.ExamenMedico;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Date;
import java.util.List;
import java.util.Optional;

public interface ExamenRepository extends MongoRepository<ExamenMedico, String> {
    List<ExamenMedico> findByPacienteId(String pacienteId);
    List<ExamenMedico> findByPacienteIdAndCitaIdAndMedicoId(String pacienteId, String citaId, String medicoId);
    Optional<ExamenMedico> findByPacienteIdAndMedicoIdAndCitaIdAndEspecialidadAndFechaSolicitudAndFechaRealizacionAndDiagnostico(
            String pacienteId,
            String medicoId,
            String citaId,
            String especialidad,
            Date fechaSolicitud,
            Date fechaRealizacion,
            String diagnostico
    );
}


