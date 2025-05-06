import { Controller, Get, Post, Param, Body, Put, Delete } from '@nestjs/common';
import { PersonaService } from '../service/persona.service';
import { Paciente } from '../entity/paciente.entity';
import { Medico } from '../entity/medico.entity';
import {ShowBasicInfoMedicoDto} from "../Dto/ShowBasicInfoMedicoDto";
import {CreateMedicoDto} from "../Dto/createMedicoDto";
import {CreatePacienteDto} from "../Dto/createPacienteDto";
import {ShowBasicInfoPacienteDto} from "../Dto/ShowBasicInfoPacienteDto";

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
    async crearPaciente(@Body() pacienteDto: CreatePacienteDto): Promise<ShowBasicInfoPacienteDto> {
        return this.personaService.createPaciente(pacienteDto);
    }


    // Crear Medico
    @Post('medico')
    async crearMedico(@Body() medicoData: CreateMedicoDto): Promise<ShowBasicInfoMedicoDto> {
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
