import { Test, TestingModule } from '@nestjs/testing';
import { ConnectionsController } from '../connections.controller';
import { ConnectionsService } from '../connections.service';
import { CreateConnectionDto } from '../dto/create-connection.dto';

describe('ConnectionsController', () => {
  let controller: ConnectionsController;
  let service: ConnectionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ConnectionsController],
      providers: [
        {
          provide: ConnectionsService,
          useValue: {
            create: jest.fn().mockResolvedValue({}),
          },
        },
      ],
    }).compile();

    controller = module.get<ConnectionsController>(ConnectionsController);
    service = module.get<ConnectionsService>(ConnectionsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should call the service create method', async () => {
      const createConnectionDto: CreateConnectionDto = {
        nomeAmigavel: 'Test',
        adapterUrl: 'http://test.com',
      };
      await controller.create(createConnectionDto);
      expect(service.create).toHaveBeenCalledWith(createConnectionDto);
    });
  });
});
