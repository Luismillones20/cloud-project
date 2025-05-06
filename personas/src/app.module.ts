import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Paciente } from './persona/entity/paciente.entity';
import { Medico } from './persona/entity/medico.entity';
import { Persona } from './persona/entity/persona.entity';
import { PersonaModule } from './persona/persona.module'; // Importamos el módulo de Persona

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres', // Asegúrate de que la contraseña sea correcta
      database: 'clinica',
      entities: [Persona, Paciente, Medico], // Asegúrate de importar todas las entidades
      synchronize: true, // Esto sincroniza las tablas automáticamente
    }),
    PersonaModule, // Asegúrate de importar el módulo de Persona aquí
  ],
})
export class AppModule {}
