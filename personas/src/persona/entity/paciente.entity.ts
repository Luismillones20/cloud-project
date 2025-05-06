import {ChildEntity, Column, Entity} from 'typeorm';
import { Persona } from './persona.entity';
@Entity()
@ChildEntity()
export class Paciente extends Persona {
    @Column({ nullable: true })
    seguroSalud: boolean;

    @Column({ nullable: true })
    estadoCivil: string;

    @Column({ nullable: true })
    tipoSangre: string;
}
