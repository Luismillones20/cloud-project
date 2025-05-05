package com.example.historial.repository;

import com.example.historial.model.historial.HistorialMedico;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;

public interface HistorialRepository extends MongoRepository<HistorialMedico, String> {
    List<HistorialMedico> findByPacienteId(String pacienteId);
}
