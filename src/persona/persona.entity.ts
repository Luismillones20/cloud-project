import { Entity, PrimaryGeneratedColumn, Column, TableInheritance } from 'typeorm';

@Entity()
@TableInheritance({ column: { type: 'varchar', name: 'type' } })
export abstract class Persona {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nombres: string;

    @Column()
    apellidos: string;

    @Column({ type: 'date' })
    fechaNacimiento: Date;

    @Column()
    sexo: string;

    @Column()
    direccion: string;

    @Column()
    telefono: string;

    @Column()
    email: string;
}
