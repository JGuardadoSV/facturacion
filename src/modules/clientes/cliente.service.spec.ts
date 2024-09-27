import { Test, TestingModule } from '@nestjs/testing';
import { ClientesService } from './clientes.service';
import { PrismaService } from '../../prisma/prisma.service';
import { Prisma, Cliente } from '@prisma/client';

describe('ClientesService', () => {
  let service: ClientesService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ClientesService, PrismaService],
    }).compile();

    service = module.get<ClientesService>(ClientesService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a cliente', async () => {
    const clienteData: Prisma.ClienteCreateInput = {
      nombre: 'Test Cliente',
      email: 'test@cliente.com',
    };

    prisma.cliente.create = jest.fn().mockReturnValue(clienteData);

    const result = await service.createCliente(clienteData);
    expect(result).toEqual(clienteData);
  });
});
