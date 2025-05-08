import {
    IsString,
    IsNotEmpty,
    IsEmail,
    IsDateString,
    IsBoolean,
    IsOptional,
    IsEnum, IsIn,
} from 'class-validator';
import { EstadoCivil } from '../enums/EstadoCivil';
import {TipoSangre} from "../enums/TipoSangre";

export class CreatePacienteDto {
    @IsString()
    @IsNotEmpty({ message: 'El nombre es obligatorio' })
    nombres: string;

    @IsString()
    @IsNotEmpty({ message: 'El apellido es obligatorio' })
    apellidos: string;

    @IsDateString({}, { message: 'La fecha de nacimiento debe tener el formato YYYY-MM-DD' })
    @IsNotEmpty({ message: 'La fecha de nacimiento es obligatoria' })
    fechaNacimiento: Date;

    @IsString()
    @IsNotEmpty({ message: 'El sexo es obligatorio' })
    @IsIn(['Masculino', 'Femenino', 'Prefiero no decir'], { message: 'Eliga algunas de las opciones en sexo (Masculino, Femenino, Prefiero no decir)' })
    sexo: string;

    @IsString()
    @IsNotEmpty({ message: 'La dirección es obligatoria' })
    direccion: string;

    @IsString()
    @IsNotEmpty({ message: 'El teléfono es obligatorio' })
    telefono: string;

    @IsEmail({}, { message: 'El correo electrónico no es válido' })
    @IsNotEmpty({ message: 'El correo electrónico es obligatorio' })
    email: string;

    @IsBoolean({ message: 'El campo seguroSalud debe ser verdadero o falso' })
    @IsOptional()
    seguroSalud?: boolean;

    @IsEnum(EstadoCivil, {
        message: `El estado civil debe ser uno de: ${Object.values(EstadoCivil).join(', ')}`,
    })
    @IsOptional()
    estadoCivil?: EstadoCivil;

    @IsEnum(TipoSangre, {
        message: `El tipo de sangre debe ser del tipo: ${Object.values(TipoSangre).join(', ')}`,
    })    @IsOptional()
    tipoSangre?: TipoSangre;
}
