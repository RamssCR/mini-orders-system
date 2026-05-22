import { ALLOWED_TRANSITIONS, Order } from './entities/order.entity';
import { BadRequestException, Injectable } from '@nestjs/common';
import { In, Repository } from 'typeorm';
import { ChangeStatusDto } from './dtos/change-status.dto';
import { CreateOrderDto } from './dtos/create-order.dto';
import { DatabaseTransactionService } from '#common/providers/query-runner.service';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderItem } from './entities/order-items.entity';
import { OrdersQueryDto } from './dtos/orders-query.dto';
import { Paginated } from '#common/types/pagination';
import { Product } from './entities/product.entity';
import { QueryRunner } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    private readonly transactionService: DatabaseTransactionService,
  ) {}

  async findPaginated(queries: OrdersQueryDto): Promise<Paginated<Order>> {
    const { limit, offset } = queries;

    const [orders, total] = await this.orderRepository.findAndCount({
      skip: offset,
      take: limit,
      relations: { items: true },
      order: { createdAt: 'DESC' },
      where: {
        ...(queries?.status && { status: queries.status }),
        ...(queries?.userId && { user: { id: queries.userId } }),
      },
    });

    return {
      data: orders,
      total,
      pages: Math.ceil(total / limit),
    };
  }

  create(payload: CreateOrderDto): Promise<Order> {
    const { products: productsDto } = payload;

    return this.transactionService.execute<Order>(async (queryRunner) => {
      const user = await this.findOrCreateUser(payload, queryRunner);

      const products = await this.getProducts(productsDto, queryRunner);
      const itemsMap = new Map(
        productsDto.map((product) => [product.id, product.quantity]),
      );

      const order = queryRunner.manager.create(Order, {
        user,
        quantity: 0,
      });
      await queryRunner.manager.save(order);

      const totalQuantity = await this.processOrderItems(
        products,
        itemsMap,
        order,
        queryRunner,
      );

      order.quantity = totalQuantity;
      return await queryRunner.manager.save(order);
    });
  }

  async updateStatus({ id, status }: ChangeStatusDto): Promise<Order> {
    const order = await this.orderRepository.findOne({ where: { id } });
    if (!order) throw new BadRequestException('Invalid order ID');

    const currentStatus = order.status;
    if (currentStatus === status) return order;

    if (!ALLOWED_TRANSITIONS[currentStatus].includes(status))
      throw new BadRequestException(
        `Invalid status transition: Cannot change from ${currentStatus} to ${status}`,
      );

    order.status = status;
    return await this.orderRepository.save(order);
  }

  private async findOrCreateUser(
    { documentId, name, phone }: Omit<CreateOrderDto, 'products'>,
    queryRunner: QueryRunner,
  ): Promise<User> {
    let user = await queryRunner.manager.findOne(User, {
      where: { documentId },
      lock: { mode: 'pessimistic_write' },
    });

    if (!user) {
      user = queryRunner.manager.create(User, { documentId, name, phone });
      await queryRunner.manager.save(user);
    }

    return user;
  }

  private async getProducts(
    productsDto: CreateOrderDto['products'],
    queryRunner: QueryRunner,
  ): Promise<Product[]> {
    const ids = productsDto.map((product) => product.id);
    const products = await queryRunner.manager.find(Product, {
      where: { id: In(ids) },
      lock: { mode: 'pessimistic_write' },
    });

    if (products.length !== productsDto.length)
      throw new BadRequestException(
        'Some products were not found during order creation',
      );

    return products;
  }

  private async processOrderItems(
    products: Product[],
    itemsMap: Map<string, number>,
    order: Order,
    queryRunner: QueryRunner,
  ): Promise<number> {
    let totalQuantity = 0;
    const orderItems: OrderItem[] = [];

    for (const product of products) {
      const quantity = itemsMap.get(product.id) ?? 0;

      if (product.stock < quantity)
        throw new BadRequestException(
          `Product ${product.name} is out of stock`,
        );

      product.stock -= quantity;
      await queryRunner.manager.save(product);

      const orderItem = queryRunner.manager.create(OrderItem, {
        quantity,
        order,
        product,
      });

      orderItems.push(orderItem);
      totalQuantity += quantity;
    }

    await queryRunner.manager.save(OrderItem, orderItems);
    return totalQuantity;
  }
}
