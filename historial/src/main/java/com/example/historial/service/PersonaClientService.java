package com.example.historial.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;

@Service
public class PersonaClientService {

    private final RestTemplate restTemplate;

    @Value("${persona-service.url}") // 👈 mejor con properties
    private String personaServiceUrl;

    public PersonaClientService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    public boolean verificarPersonaExiste(String personaId) {
        try {
            String url = personaServiceUrl + "/api/personas/paciente/dni/" + personaId;
            System.out.println(url);
            restTemplate.getForObject(url, String.class);
            return true;
        } catch (HttpClientErrorException.NotFound e) {
            return false;
        } catch (Exception e) {
            throw new RuntimeException("Error al consultar persona_service", e);
        }
    }
}