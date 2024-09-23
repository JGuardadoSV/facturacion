import { PartialType } from '@nestjs/mapped-types';
import { CreateUsuarioDto } from './usuario.dto';
export class UpdateUsuarioDto extends PartialType(CreateUsuarioDto) {}