// cliente.model.ts
import { empresa as Empresa, venta as Venta } from '@prisma/client';

export class Cliente {
  idCliente: number;
  fechaRegistro: Date;
  nombre: string;
  telefono?: string;
  direccion?: string;
  email: string;
  ventas: Venta[];
  empresaId?: number;
  Empresa?: Empresa;
}
