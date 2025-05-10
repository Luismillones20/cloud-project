import {IsString, IsNotEmpty, IsEmail, IsIn, IsEnum, Length, Matches, IsArray, ValidateNested  } from 'class-validator';
import {EspecialidadMedica} from "../enums/EspecialidadMedica";
import { Type } from 'class-transformer';

class TurnoDto {
    @IsString()
    inicio: string;

    @IsString()
    fin: string;
}

class DiaHorarioDto {
    @IsString()
    dia: string;

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => TurnoDto)
    turnos: TurnoDto[];
}

export class CreateMedicoDto {
    @IsString()
    @IsNotEmpty({ message: 'El DNI es obligatorio' })
    @Length(8, 8, { message: 'El DNI debe tener exactamente 8 dígitos' })
    @Matches(/^[0-9]{8}$/, { message: 'El DNI debe contener solo números' })
    dni: string;

    @IsString()
    @IsNotEmpty({ message: 'La contraseña es obligatoria' })
    @Length(8, 100, {
        message: 'La contraseña debe tener al menos 8 caracteres',
    })
    password: string;

    @IsString()
    @IsNotEmpty({ message: 'El nombre es obligatorio' })
    nombres: string;

    @IsString()
    @IsNotEmpty({ message: 'El apellido es obligatorio' })
    apellidos: string;

    @IsString()
    @IsNotEmpty({ message: 'El teléfono es obligatorio' })
    telefono: string;

    @IsEmail({}, { message: 'El correo no es válido' })
    @IsNotEmpty({ message: 'El correo es obligatorio' })
    email: string;

    @IsString()
    @IsEnum(EspecialidadMedica, {
        message: `La especialidad debe ser una de: ${Object.values(EspecialidadMedica).join(', ')}`,
    })
    @IsNotEmpty({ message: 'La especialidad es obligatoria' })
    especialidad: string;

    @IsString()
    @IsNotEmpty({ message: 'La colegiatura es obligatoria' })
    colegiatura: string;

    @IsString()
    @IsNotEmpty({ message: 'La dirección es obligatoria' })
    direccion: string;

    @IsString()
    @IsNotEmpty({ message: 'El sexo es obligatorio' })
    @IsIn(['Masculino', 'Femenino', 'Prefiero no decir'], { message: 'Eliga algunas de las opciones en sexo (Masculino, Femenino, Prefiero no decir)' })
    sexo: string;

    @IsNotEmpty({ message: 'La fecha de nacimiento es obligatoria' })
    fechaNacimiento: Date;

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => DiaHorarioDto)
    horario: DiaHorarioDto[];
}
