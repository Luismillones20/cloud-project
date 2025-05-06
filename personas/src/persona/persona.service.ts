import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Paciente } from './paciente.entity';
import { Medico } from './medico.entity';
import { NotFoundException } from '@nestjs/common';

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
    async createPaciente(pacienteData: Partial<Paciente>): Promise<Paciente> {
        const paciente = this.pacienteRepo.create(pacienteData);
        return await this.pacienteRepo.save(paciente);
    }

    // Crear Medico
    async createMedico(medicoData: Partial<Medico>): Promise<Medico> {
        const medico = this.medicoRepo.create(medicoData);
        return await this.medicoRepo.save(medico);
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


    // Eliminar Paciente
    async removePaciente(id: number): Promise<void> {
        await this.pacienteRepo.delete(id);
    }

    // Eliminar Medico
    async removeMedico(id: number): Promise<void> {
        await this.medicoRepo.delete(id);
    }
}
