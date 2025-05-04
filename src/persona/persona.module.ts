import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Paciente } from './paciente.entity';
import { Medico } from './medico.entity';
import { PersonaService } from './persona.service';
import { PersonaController } from './persona.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Paciente, Medico])],
  providers: [PersonaService],
  controllers: [PersonaController],
})
export class PersonaModule {}
