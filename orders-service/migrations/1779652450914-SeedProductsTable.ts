import { Any, MigrationInterface, QueryRunner } from 'typeorm';
import products from '$seeders/products.json';

export class SeedProductsTable1779652450914 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager.insert('products', products);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager.delete('products', {
      name: Any(products.map((product) => product.name)),
    });
  }
}
