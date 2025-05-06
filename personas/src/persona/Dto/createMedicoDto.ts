import { IsString, IsNotEmpty, IsEmail, IsIn, IsEnum } from 'class-validator';
import {EspecialidadMedica} from "../enums/EspecialidadMedica";

export class CreateMedicoDto {
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
}
