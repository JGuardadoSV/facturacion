import { PartialType } from '@nestjs/mapped-types';
import { CreateClienteDto } from './cliente.dto';
export class UpdateClienteDto extends PartialType(CreateClienteDto) {}