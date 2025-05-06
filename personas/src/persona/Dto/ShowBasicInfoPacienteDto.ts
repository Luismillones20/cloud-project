import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class ShowBasicInfoPacienteDto {
    @Expose()
    nombres: string;

    @Expose()
    apellidos: string;

    @Expose()
    tipoSangre: string;

    @Expose()
    email: string;

    @Expose()
    telefono: string;
}
