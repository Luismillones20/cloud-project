import {Exclude, Expose, Type} from 'class-transformer';
class TurnoDto {
    @Expose()
    inicio: string;

    @Expose()
    fin: string;
}

class DiaHorarioDto {
    @Expose()
    dia: string;

    @Expose()
    @Type(() => TurnoDto)
    turnos: TurnoDto[];
}

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

    @Expose()
    @Type(() => DiaHorarioDto)
    horario: DiaHorarioDto[];
}
