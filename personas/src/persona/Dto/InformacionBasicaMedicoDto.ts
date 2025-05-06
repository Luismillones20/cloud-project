import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class InformacionBasicaMedicoDto {
    @Expose()
    nombres: string;

    @Expose()
    apellidos: string;

    @Expose()
    telefono: string;

    @Expose()
    email: string;

    @Expose()
    especialidad: string;
}
