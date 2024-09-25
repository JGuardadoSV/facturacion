import {
  IsInt,
  IsDate,
  IsNumber,
  IsArray,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { VentaDetalleDTO } from './ventadetalle.dto';
export class CreateVentaDTO {
  @IsInt()
  tipoVenta: number;

  @IsNumber()
  total: number;

  detalles: VentaDetalleDTO[];

  @IsInt()
  empresaId: number;

  @IsInt()
  clienteId: number;
}
