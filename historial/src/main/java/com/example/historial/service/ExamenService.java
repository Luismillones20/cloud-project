package com.example.historial.service;

import com.example.historial.Dto.ShowExamenDTO;
import com.example.historial.model.examen.ExamenMedico;
import com.example.historial.repository.ExamenRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class ExamenService {

    private final ExamenRepository repository;
    private final PersonaClientService personaClientService;  // 👈 nuevo

    @Autowired
    public ExamenService(ExamenRepository repository, PersonaClientService personaClientService) {
        this.repository = repository;
        this.personaClientService = personaClientService;
    }

    public List<ShowExamenDTO> obtenerDTOsPorPaciente(String pacienteId) {
        List<ExamenMedico> historiales = repository.findByPacienteId(pacienteId);

        if (historiales.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND,
                    "No se encontraron historiales para el paciente con ID: " + pacienteId);
        }

        return historiales.stream()
                .map(this::convertirAshowDTO)
                .toList();
    }

    public ExamenMedico crear(ExamenMedico nuevoExamen) {
        // ✅ 1. Validar si existe el paciente
        boolean personaExiste = personaClientService.verificarPersonaExiste(nuevoExamen.getPacienteId());
        if (!personaExiste) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND,
                    "No existe una persona con ID: " + nuevoExamen.getPacienteId());
        }

        // ✅ 2. Validar si ya existe el mismo examen
        boolean existe = repository
                .findByPacienteIdAndMedicoIdAndCitaIdAndEspecialidadAndFechaSolicitudAndFechaRealizacionAndDiagnostico(
                        nuevoExamen.getPacienteId(),
                        nuevoExamen.getMedicoId(),
                        nuevoExamen.getCitaId(),
                        nuevoExamen.getEspecialidad(),
                        nuevoExamen.getFechaSolicitud(),
                        nuevoExamen.getFechaRealizacion(),
                        nuevoExamen.getDiagnostico()
                ).isPresent();

        if (existe) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Ya existe un examen idéntico");
        }

        // ✅ 3. Guardar el examen
        return repository.save(nuevoExamen);
    }
    public List<ShowExamenDTO> buscarPorPacienteCitaMedico(String pacienteId, String citaId, String medicoId) {
        List<ExamenMedico> resultados = repository.findByPacienteIdAndCitaIdAndMedicoId(pacienteId, citaId, medicoId);

        if (resultados.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND,
                    "No se encontraron historiales para pacienteId=" + pacienteId +
                            ", citaId=" + citaId + ", medicoId=" + medicoId);
        }

        return resultados.stream()
                .map(this::convertirAshowDTO)
                .toList();
    }


    public ShowExamenDTO convertirAshowDTO(ExamenMedico examen) {
        ShowExamenDTO dto = new ShowExamenDTO();
        dto.setPacienteId(examen.getPacienteId());
        dto.setDiagnostico(examen.getDiagnostico());
        dto.setEspecialidad(examen.getEspecialidad());
        dto.setMedicoId(examen.getMedicoId());
        dto.setCitaId(examen.getCitaId());
        return dto;
    }


}
