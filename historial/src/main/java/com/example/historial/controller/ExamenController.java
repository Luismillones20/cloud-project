package com.example.historial.controller;

import com.example.historial.Dto.ShowExamenDTO;
import com.example.historial.model.examen.ExamenMedico;
import com.example.historial.service.ExamenService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/examen")
public class ExamenController {

    private final ExamenService service;

    public ExamenController(ExamenService service) {
        this.service = service;
    }

    @GetMapping("/buscar")
    public List<ShowExamenDTO> buscarPorPacienteCitaMedico(
            @RequestParam String pacienteId,
            @RequestParam String citaId,
            @RequestParam String medicoId) {
        return service.buscarPorPacienteCitaMedico(pacienteId, citaId, medicoId);
    }

    @GetMapping("/{pacienteId}")
    public List<ShowExamenDTO> obtenerHistorial(@PathVariable String pacienteId) {
        return service.obtenerDTOsPorPaciente(pacienteId);
    }

    @PostMapping
    public ShowExamenDTO crearHistorial(@Valid @RequestBody ExamenMedico examenMedico) {
        ExamenMedico creado = service.crear(examenMedico);
        return service.convertirAshowDTO(creado);
    }
}
