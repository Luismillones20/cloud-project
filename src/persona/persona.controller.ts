import { Controller, Get, Post, Param, Body, Put, Delete } from '@nestjs/common';
import { PersonaService } from './persona.service';
import { Paciente } from './paciente.entity';
import { Medico } from './medico.entity';

@Controller('api/personas')
export class PersonaController {
    constructor(private readonly personaService: PersonaService) {}

    // Obtener Paciente por ID
    @Get('paciente/:id')
    async obtenerPaciente(@Param('id') id: number): Promise<Paciente> {
        return this.personaService.getPacienteById(id);
    }

    // Obtener Medico por ID
    @Get('medico/:id')
    async obtenerMedico(@Param('id') id: number): Promise<Medico> {
        return this.personaService.getMedicoById(id);
    }

    // Crear Paciente
    @Post('paciente')
    async crearPaciente(@Body() pacienteData: Partial<Paciente>): Promise<Paciente> {
        return this.personaService.createPaciente(pacienteData);
    }

    // Crear Medico
    @Post('medico')
    async crearMedico(@Body() medicoData: Partial<Medico>): Promise<Medico> {
        return this.personaService.createMedico(medicoData);
    }

    // Actualizar Paciente
    @Put('paciente/:id')
    async actualizarPaciente(
        @Param('id') id: number,
        @Body() pacienteData: Partial<Paciente>,
    ): Promise<Paciente> {
        return this.personaService.updatePaciente(id, pacienteData);
    }

    // Actualizar Medico
    @Put('medico/:id')
    async actualizarMedico(
        @Param('id') id: number,
        @Body() medicoData: Partial<Medico>,
    ): Promise<Medico> {
        return this.personaService.updateMedico(id, medicoData);
    }

    // Eliminar Paciente
    @Delete('paciente/:id')
    async eliminarPaciente(@Param('id') id: number): Promise<void> {
        return this.personaService.removePaciente(id);
    }

    // Eliminar Medico
    @Delete('medico/:id')
    async eliminarMedico(@Param('id') id: number): Promise<void> {
        return this.personaService.removeMedico(id);
    }
}
