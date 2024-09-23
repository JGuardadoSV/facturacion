import { PartialType } from '@nestjs/mapped-types';
import { CreateEmpresaDto } from './empresa.dto';
export class UpdateEmpresaDto extends PartialType(CreateEmpresaDto) {}