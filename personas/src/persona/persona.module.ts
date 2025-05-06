import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Paciente } from './entity/paciente.entity';
import { Medico } from './entity/medico.entity';
import { PersonaService } from './service/persona.service';
import { PersonaController } from './controller/persona.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Paciente, Medico])],
  providers: [PersonaService],
  controllers: [PersonaController],
})
export class PersonaModule {}
