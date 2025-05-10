import {BadRequestException, Injectable} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {QueryFailedError, Repository} from 'typeorm';
import { Paciente } from '../entity/paciente.entity';
import { Medico } from '../entity/medico.entity';
import { NotFoundException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import {ShowBasicInfoMedicoDto} from "../Dto/ShowBasicInfoMedicoDto";
import {ShowBasicInfoPacienteDto} from "../Dto/ShowBasicInfoPacienteDto";
import { CreateMedicoDto} from '../Dto/createMedicoDto';// ajusta la ruta si es distinta
import {CreatePacienteDto} from '../Dto/createPacienteDto';
import { UpdateMedicoDto } from '../Dto/updateMedicoDto';
import {UpdatePacienteDto} from "../Dto/updatePacienteDto"; // importa el DTO nuevo
import * as bcrypt from 'bcrypt'; // al inicio


@Injectable()
export class PersonaService {
    constructor(
        @InjectRepository(Paciente)
        private pacienteRepo: Repository<Paciente>,
        @InjectRepository(Medico)
        private medicoRepo: Repository<Medico>,
    ) {}

    // Obtener Paciente por ID
    async getPacienteById(id: number): Promise<ShowBasicInfoPacienteDto> {
        const paciente = await this.pacienteRepo.findOne({ where: { id } });
        if (!paciente) {
            throw new NotFoundException(`Paciente con ID ${id} no encontrado`);
        }
        return plainToInstance(ShowBasicInfoPacienteDto, paciente, { excludeExtraneousValues: true });
    }

    async getPacienteByDni(dni: string): Promise<ShowBasicInfoPacienteDto> {
        const paciente = await this.pacienteRepo.findOne({ where: { dni } });
        if (!paciente) {
            throw new NotFoundException(`Paciente con DNI ${dni} no encontrado`);
        }
        return plainToInstance(ShowBasicInfoPacienteDto, paciente, { excludeExtraneousValues: true });
    }
    async getMedicoByDni(dni: string): Promise<ShowBasicInfoMedicoDto> {
        const medico = await this.medicoRepo.findOne({ where: { dni } });
        if (!medico) {
            throw new NotFoundException(`Médico con DNI ${dni} no encontrado`);
        }
        return plainToInstance(ShowBasicInfoMedicoDto, medico, { excludeExtraneousValues: true });
    }

    // Obtener Medico por ID
    async getMedicoById(id: number): Promise<ShowBasicInfoMedicoDto> {
        const medico = await this.medicoRepo.findOne({ where: { id } });
        if (!medico) {
            throw new NotFoundException(`Medico con ID ${id} no encontrado`);
        }
        return plainToInstance(ShowBasicInfoMedicoDto, medico, { excludeExtraneousValues: true });
    }


    // Crear Paciente
    async createPaciente(pacienteData: CreatePacienteDto): Promise<ShowBasicInfoPacienteDto> {
        try {
            const paciente = this.pacienteRepo.create(pacienteData);
            const saved = await this.pacienteRepo.save(paciente);
            return plainToInstance(ShowBasicInfoPacienteDto, saved, { excludeExtraneousValues: true });
        } catch (error) {
            if (error instanceof QueryFailedError && (error as any).code === '23505') {
                throw new BadRequestException('Ya existe un paciente con ese DNI.');
            }
            throw error; // Re-lanzar cualquier otro error
        }
    }


    // Crear Medico
    async createMedico(medicoData: CreateMedicoDto): Promise<ShowBasicInfoMedicoDto> {
        try {
            const medico = this.medicoRepo.create(medicoData);
            const saved = await this.medicoRepo.save(medico);
            return plainToInstance(ShowBasicInfoMedicoDto, saved, { excludeExtraneousValues: true });
        } catch (error) {
            if (error instanceof QueryFailedError && (error as any).code === '23505') {
                throw new BadRequestException('Ya existe un médico con ese DNI.');
            }
            throw error; // re-lanzar cualquier otro error
        }
    }

    // Actualizar Paciente y retornar DTO
    async updatePaciente(id: number, pacienteData: UpdatePacienteDto): Promise<ShowBasicInfoPacienteDto> {
        await this.pacienteRepo.update(id, pacienteData);
        const paciente = await this.pacienteRepo.findOne({ where: { id } });
        if (!paciente) {
            throw new NotFoundException(`Paciente con ID ${id} no encontrado`);
        }
        return plainToInstance(ShowBasicInfoPacienteDto, paciente, { excludeExtraneousValues: true });
    }

    // Actualizar Médico y retornar DTO
    async updateMedico(id: number, medicoData: UpdateMedicoDto): Promise<ShowBasicInfoMedicoDto> {
        await this.medicoRepo.update(id, medicoData);
        const medico = await this.medicoRepo.findOne({ where: { id } });
        if (!medico) {
            throw new NotFoundException(`Medico con ID ${id} no encontrado`);
        }
        return plainToInstance(ShowBasicInfoMedicoDto, medico, { excludeExtraneousValues: true });
    }

    async removePaciente(id: number): Promise<void> {
        const result = await this.pacienteRepo.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException(`Paciente con ID ${id} no encontrado`);
        }
    }

    async removeMedico(id: number): Promise<void> {
        const result = await this.medicoRepo.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException(`Médico con ID ${id} no encontrado`);
        }
    }
    async buscarMedicosPorEspecialidadYDia(especialidad: string, dia: string): Promise<ShowBasicInfoMedicoDto[]> {
        // 1. Buscar médicos que coincidan con especialidad (insensible a mayúsculas/minúsculas)
        const medicos = await this.medicoRepo.createQueryBuilder('medico')
            .where('medico.especialidad ILIKE :especialidad', { especialidad: `%${especialidad}%` })
            .getMany();

        // 2. Filtrar en memoria por día en el horario
        const medicosFiltrados = medicos.filter(medico =>
            medico.horario?.some((bloque: any) => bloque.dia.toLowerCase() === dia.toLowerCase())
        );

        // 3. Mapear a DTOs
        return medicosFiltrados.map(medico =>
            plainToInstance(ShowBasicInfoMedicoDto, medico, { excludeExtraneousValues: true })
        );
    }

}
