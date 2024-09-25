import { PartialType } from '@nestjs/mapped-types';
import { CreateProductoDto } from './producto.dto';
export class UpdateProductoDto extends PartialType(CreateProductoDto) {}
