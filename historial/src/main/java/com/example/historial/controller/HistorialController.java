package com.example.historial.controller;

import com.example.historial.model.historial.HistorialMedico;
import com.example.historial.service.HistorialService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/historial")
public class HistorialController {

    private final HistorialService service;

    public HistorialController(HistorialService service) {
        this.service = service;
    }

    @GetMapping("/{pacienteId}")
    public List<HistorialMedico> obtenerHistorial(@PathVariable String pacienteId) {
        return service.obtenerPorPaciente(pacienteId);
    }

    @PostMapping
    public HistorialMedico crearHistorial(@Valid @RequestBody HistorialMedico historial) {
        System.out.println("Recibido: " + historial.toString());
        return service.crear(historial);
    }
}
