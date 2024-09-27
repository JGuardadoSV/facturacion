import { Test, TestingModule } from '@nestjs/testing';
import { ClienteController } from './clientes.controller';
import { ClientesService } from './clientes.service';
import { CreateClienteDto } from './dto/cliente.dto';
import { AuthGuard } from '@nestjs/passport';

describe('ClienteController', () => {
  let controller: ClienteController;
  let clienteService: ClientesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ClienteController],
      providers: [
        {
          provide: ClientesService,
          useValue: {
            createCliente: jest.fn(),
          },
        },
      ],
    })
      .overrideGuard(AuthGuard('jwt'))
      .useValue({ canActivate: () => true })
      .compile();

    controller = module.get<ClienteController>(ClienteController);
    clienteService = module.get<ClientesService>(ClientesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a new cliente', async () => {
      const createClienteDto: CreateClienteDto = {
        nombre: 'Test Cliente',
        email: 'test@example.com',
        telefono: '1234567890',
        direccion: 'Test Address',
        empresaId: 1,
      };

      const expectedResult = {
        idCliente: 1,
        fechaRegistro: new Date(),
        nombre: 'Test Cliente',
        telefono: '1234567890',
        direccion: 'Test Address',
        email: 'test@example.com',
        empresaId: 1,
      };

      jest
        .spyOn(clienteService, 'createCliente')
        .mockResolvedValue(expectedResult);

      const result = await controller.create(createClienteDto);

      expect(clienteService.createCliente).toHaveBeenCalledWith(
        createClienteDto,
      );
      expect(result).toEqual(expectedResult);
    });
  });
});
