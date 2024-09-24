import { PartialType } from '@nestjs/mapped-types';
import { CreateProveedorDto } from './proveedor.dto';
export class UpdateProveedorDto extends PartialType(CreateProveedorDto) {}
