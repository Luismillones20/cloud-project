
import {
    IsOptional,
    IsString,
    IsEmail,
    IsDateString, IsIn, IsEnum,
} from 'class-validator';
import {EstadoCivil} from "../enums/EstadoCivil";
import {TipoSangre} from "../enums/TipoSangre";

export class UpdatePacienteDto {
    @IsOptional()
    @IsString()
    nombres?: string;

    @IsOptional()
    @IsString()
    apellidos?: string;

    @IsOptional()
    @IsString()
    telefono?: string;

    @IsOptional()
    @IsEmail()
    email?: string;

    @IsOptional()
    @IsString()
    direccion?: string;

    @IsOptional()
    @IsString()
    @IsIn(['Masculino', 'Femenino', 'Prefiero no decir'], { message: 'Eliga algunas de las opciones en sexo (Masculino, Femenino, Prefiero no decir)' })
    sexo?: string;

    @IsOptional()
    @IsDateString({}, { message: 'La fecha de nacimiento debe tener el formato YYYY-MM-DD' })
    fechaNacimiento?: Date;

    @IsOptional()
    @IsEnum(EstadoCivil, {
        message: `El estado civil debe ser uno de: ${Object.values(EstadoCivil).join(', ')}`,
    })
    estadoCivil?: EstadoCivil;

    @IsEnum(TipoSangre, {
        message: `El tipo de sangre debe ser del tipo: ${Object.values(TipoSangre).join(', ')}`,
    })    @IsOptional()
    tipoSangre?: TipoSangre;

}
