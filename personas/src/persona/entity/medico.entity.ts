import { ChildEntity, Column, Entity } from 'typeorm';
import { Persona } from './persona.entity';
@Entity()
@ChildEntity()
export class Medico extends Persona {
    @Column()
    especialidad: string;

    @Column()
    colegiatura: string;

    @Column('simple-json')
    horario: {
        dia: string;
        turnos: { inicio: string; fin: string }[];
    }[];
}