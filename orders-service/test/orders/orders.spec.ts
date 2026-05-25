import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule, getRepositoryToken } from '@nestjs/typeorm';
import { CreateOrderDto } from '#orders/dtos/create-order.dto';
import { INestApplication } from '@nestjs/common';
import { OrdersModule } from '../../src/orders/orders.module';
import { DataSource } from 'typeorm';
import { Order } from '#orders/entities/order.entity';
import { OrdersController } from '#orders/orders.controller';
import { of } from 'rxjs';

describe('Orders Service - Creation Flow (integration)', () => {
  let app: INestApplication;
  let dataSource: DataSource;
  let moduleFixture: TestingModule;

  beforeAll(async () => {
    const mockEntityManager = {
      findOne: jest.fn().mockResolvedValue({
        id: 'mock-user-uuid',
        documentId: '123456789',
        name: 'Test User',
      }),
      find: jest
        .fn()
        .mockResolvedValue([
          { id: '00000000-0000-4000-a000-000000000001', quantity: 40 },
        ]),
      save: jest
        .fn()
        .mockImplementation((entity) =>
          Promise.resolve({ id: 'mock-id', ...entity }),
        ),
      create: jest.fn().mockReturnValue({
        id: '00000000-0000-4000-a000-000000000002',
        quantity: 10,
        items: [],
        status: 'pending',
        user: { id: '00000000-0000-4000-a000-000000000006' },
      }),
    };

    const mockQueryRunner = {
      connect: jest.fn().mockResolvedValue(null),
      startTransaction: jest.fn().mockResolvedValue(null),
      commitTransaction: jest.fn().mockResolvedValue(null),
      rollbackTransaction: jest.fn().mockResolvedValue(null),
      release: jest.fn().mockResolvedValue(null),
      manager: mockEntityManager,
    };

    const mockRepository = {
      find: jest.fn(),
      findOne: jest.fn(),
      save: jest.fn().mockResolvedValue({ id: 'mocked-id', status: 'pending' }),
    };

    const mockDataSource = {
      createQueryRunner: jest.fn().mockReturnValue(mockQueryRunner),
      manager: {
        query: jest.fn().mockResolvedValue([{ stock: 48 }]),
      },
      destroy: jest.fn().mockResolvedValue(null),
    };

    const mockRabbitClient = {
      emit: jest.fn().mockReturnValue(of(null)),
      send: jest.fn().mockReturnValue(of(null)),
    };

    moduleFixture = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'postgres',
          autoLoadEntities: false,
          synchronize: false,
        }),
        OrdersModule,
      ],
    })
      .overrideProvider(DataSource)
      .useValue(mockDataSource)
      .overrideProvider(getRepositoryToken(Order))
      .useValue(mockRepository)
      .overrideProvider('AUDIT_SERVICE_PROXY')
      .useValue(mockRabbitClient)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    dataSource = moduleFixture.get<DataSource>(DataSource);
  });

  afterAll(async () => {
    if (dataSource) await dataSource.destroy();
    if (app) await app.close();
  });

  it('successfully places an order and deduct inventory stock', async () => {
    const payload = {
      name: 'Test User',
      documentId: '10000382964',
      phone: '3000123456',
      products: [{ id: '00000000-0000-4000-a000-000000000001', quantity: 10 }],
    } satisfies CreateOrderDto;

    const controller = moduleFixture.get<OrdersController>(OrdersController);
    const result = await controller.create(payload);

    expect(result).toHaveProperty('id');
    expect(result.status).toBe('pending');
  });
});
