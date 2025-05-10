import { Controller, Get, Post, Param, Body, Put, Delete, Query } from '@nestjs/common';
import { PersonaService } from '../service/persona.service';
import { Paciente } from '../entity/paciente.entity';
import { Medico } from '../entity/medico.entity';
import {ShowBasicInfoMedicoDto} from "../Dto/ShowBasicInfoMedicoDto";
import {CreateMedicoDto} from "../Dto/createMedicoDto";
import {CreatePacienteDto} from "../Dto/createPacienteDto";
import {ShowBasicInfoPacienteDto} from "../Dto/ShowBasicInfoPacienteDto";
import { UpdateMedicoDto } from '../Dto/updateMedicoDto';
import {UpdatePacienteDto} from "../Dto/updatePacienteDto"; // importa el DTO nuevo


@Controller('api/personas')
export class PersonaController {
    constructor(private readonly personaService: PersonaService) {}

    // Obtener Paciente por ID
    @Get('paciente/:id')
    async obtenerPaciente(@Param('id') id: number): Promise<ShowBasicInfoPacienteDto> {
        return this.personaService.getPacienteById(id);
    }

    // Obtener Medico por ID
    @Get('medico/:id')
    async obtenerMedico(@Param('id') id: number): Promise<ShowBasicInfoMedicoDto> {
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
        @Body() pacienteData: UpdatePacienteDto,
    ): Promise<ShowBasicInfoPacienteDto> {
        return this.personaService.updatePaciente(id, pacienteData);
    }

    // Actualizar Medico
    @Put('medico/:id')
    async actualizarMedico(
        @Param('id') id: number,
        @Body() medicoData: UpdateMedicoDto,
    ): Promise<ShowBasicInfoMedicoDto> {
        return this.personaService.updateMedico(id, medicoData);
    }

    // Eliminar Paciente
    @Delete('paciente/:id')
    async eliminarPaciente(@Param('id') id: number): Promise<{ mensaje: string }> {
        await this.personaService.removePaciente(id);
        return { mensaje: `Paciente con ID ${id} eliminado exitosamente.` };
    }

    // Eliminar Medico
    @Delete('medico/:id')
    async eliminarMedico(@Param('id') id: number): Promise<{ mensaje: string }> {
        await this.personaService.removeMedico(id);
        return { mensaje: `Médico con ID ${id} eliminado exitosamente.` };
    }
    /////////////////////////////
    @Get('paciente/dni/:dni')
    async obtenerPacientePorDni(@Param('dni') dni: string): Promise<ShowBasicInfoPacienteDto> {
        return this.personaService.getPacienteByDni(dni);
    }
    @Get('medico/dni/:dni')
    async obtenerMedicoPorDni(@Param('dni') dni: string): Promise<ShowBasicInfoMedicoDto> {
        return this.personaService.getMedicoByDni(dni);
    }

    // persona.controller.ts
    @Get('medicos')
    async buscarMedicosPorEspecialidadYDia(
        @Query('especialidad') especialidad: string,
        @Query('dia') dia: string,
    ): Promise<ShowBasicInfoMedicoDto[]> {
        return this.personaService.buscarMedicosPorEspecialidadYDia(especialidad, dia);
    }


}
