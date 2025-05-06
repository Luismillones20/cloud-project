import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class ShowBasicInfoMedicoDto {
    @Expose()
    nombres: string;

    @Expose()
    apellidos: string;

    @Expose()
    especialidad: string;

    @Expose()
    email: string;

    @Expose()
    telefono: string;
}
