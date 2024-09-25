import {
  IsInt,
  IsDate,
  IsNumber,
  IsArray,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CompraDetalleDTO } from './compradetalle.dto';

export class CreateCompraDTO {
  @IsInt()
  numeroFactura: number;

  @IsNumber()
  total: number;

  @IsInt()
  iva: number;

  detalles: CompraDetalleDTO[];

  @IsInt()
  empresaId: number;

  @IsInt()
  proveedorId: number;
}
