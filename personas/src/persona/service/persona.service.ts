import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Paciente } from '../entity/paciente.entity';
import { Medico } from '../entity/medico.entity';
import { NotFoundException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import {ShowBasicInfoMedicoDto, } from "../Dto/ShowBasicInfoMedicoDto";
import {ShowBasicInfoPacienteDto} from "../Dto/ShowBasicInfoPacienteDto";
import { CreateMedicoDto} from '../Dto/createMedicoDto';// ajusta la ruta si es distinta
import {CreatePacienteDto} from '../Dto/createPacienteDto';


@Injectable()
export class PersonaService {
    constructor(
        @InjectRepository(Paciente)
        private pacienteRepo: Repository<Paciente>,
        @InjectRepository(Medico)
        private medicoRepo: Repository<Medico>,
    ) {}

    // Obtener Paciente por ID
    async getPacienteById(id: number): Promise<Paciente> {
        const paciente = await this.pacienteRepo.findOne({ where: { id } });
        if (!paciente) {
            throw new NotFoundException(`Paciente con ID ${id} no encontrado`);
        }
        return paciente;
    }

    // Obtener Medico por ID
    async getMedicoById(id: number): Promise<Medico> {
        const medico = await this.medicoRepo.findOne({ where: { id } });
        if (!medico) {
            throw new NotFoundException(`Medico con ID ${id} no encontrado`);
        }
        return medico;
    }


    // Crear Paciente
    async createPaciente(pacienteData: CreatePacienteDto): Promise<ShowBasicInfoPacienteDto> {
        const paciente = this.pacienteRepo.create(pacienteData);
        const saved = await this.pacienteRepo.save(paciente);
        return plainToInstance(ShowBasicInfoPacienteDto, saved, { excludeExtraneousValues: true });
    }


    // Crear Medico
    async createMedico(medicoData: CreateMedicoDto): Promise<ShowBasicInfoMedicoDto> {
        const medico = this.medicoRepo.create(medicoData);
        const saved = await this.medicoRepo.save(medico);
        return plainToInstance(ShowBasicInfoMedicoDto, saved, { excludeExtraneousValues: true });
    }


    async updatePaciente(id: number, pacienteData: Partial<Paciente>): Promise<Paciente> {
        await this.pacienteRepo.update(id, pacienteData);
        const paciente = await this.pacienteRepo.findOne({ where: { id } });
        if (!paciente) {
            throw new NotFoundException(`Paciente con ID ${id} no encontrado`);
        }
        return paciente;
    }

    // Actualizar Medico
    async updateMedico(id: number, medicoData: Partial<Medico>): Promise<Medico> {
        await this.medicoRepo.update(id, medicoData);
        const medico = await this.medicoRepo.findOne({ where: { id } });
        if (!medico) {
            throw new NotFoundException(`Medico con ID ${id} no encontrado`);
        }
        return medico;
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
}
