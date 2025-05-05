package com.example.historial.service;

import com.example.historial.exception.RecursoNoEncontradoException;
import com.example.historial.model.historial.HistorialMedico;
import com.example.historial.repository.HistorialRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class HistorialService {

    private final HistorialRepository repository;

    public HistorialService(HistorialRepository repository) {
        this.repository = repository;
    }

    public List<HistorialMedico> obtenerPorPaciente(String pacienteId) {
        return repository.findByPacienteId(pacienteId);
    }

    public HistorialMedico crear(HistorialMedico historial) {
        return repository.save(historial);
    }
    public HistorialMedico obtenerPorId(String id) {
        return repository.findById(id)
                .orElseThrow(() -> new RecursoNoEncontradoException("Historial no encontrado con ID: " + id));
    }

}
