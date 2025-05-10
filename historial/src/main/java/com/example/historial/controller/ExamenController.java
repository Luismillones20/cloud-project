package com.example.historial.controller;

import com.example.historial.Dto.ShowExamenDTO;
import com.example.historial.model.examen.ExamenMedico;
import com.example.historial.service.ExamenService;
import com.example.historial.service.PersonaClientService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/examenes")
public class ExamenController {

    private final ExamenService service;

    public ExamenController(ExamenService service) {
        this.service = service;
    }
    @Autowired
    private PersonaClientService personaClientService;


    @GetMapping("/buscar")
    public List<ShowExamenDTO> buscarPorPacienteCitaMedico(
            @RequestParam String pacienteId,
            @RequestParam String citaId,
            @RequestParam String medicoId) {
        return service.buscarPorPacienteCitaMedico(pacienteId, citaId, medicoId);
    }

    @GetMapping("/{pacienteId}")
    public List<ShowExamenDTO> obtenerExamen(@PathVariable String pacienteId) {
        return service.obtenerDTOsPorPaciente(pacienteId);
    }

    @PostMapping
    public ShowExamenDTO crearHistorial(@Valid @RequestBody ExamenMedico examenMedico) {
        ExamenMedico creado = service.crear(examenMedico);
        return service.convertirAshowDTO(creado);
    }
    /*@PostMapping
    public String crearExamen(@RequestParam String personaId) {
        boolean existe = personaClientService.verificarPersonaExiste(personaId);

        if (!existe) {
            return "Error: La persona con ID " + personaId + " no existe.";
        }

        // Lógica para crear el examen
        return "Examen creado para persona ID: " + personaId;
    }*/
}
