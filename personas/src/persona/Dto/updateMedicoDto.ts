// updateMedicoDto.ts
import {
    IsOptional,
    IsString,
    IsIn,
    IsEmail,
    IsDateString, IsEnum,
} from 'class-validator';
import {EspecialidadMedica} from "../enums/EspecialidadMedica";

export class UpdateMedicoDto {
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
    @IsEnum(EspecialidadMedica, {
        message: `La especialidad debe ser una de: ${Object.values(EspecialidadMedica).join(', ')}`,
    })
    especialidad?: string;

    @IsOptional()
    @IsString()
    colegiatura?: string;

    @IsOptional()
    @IsString()
    direccion?: string;

    @IsOptional()
    @IsString()
    @IsIn(['Masculino', 'Femenino', 'Prefiero no decir'], { message: 'Eliga algunas de las opciones en sexo (Masculino, Femenino, Prefiero no decir)' })
    sexo?: string;

    @IsOptional()
    @IsDateString()
    fechaNacimiento?: string;
}
