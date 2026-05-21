import { DataSource, QueryRunner } from 'typeorm';
import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class DatabaseTransactionService {
  private readonly logger = new Logger(DatabaseTransactionService.name);

  constructor(private readonly dataSource: DataSource) {}

  /**
   * Executes a function within a database transaction.
   * @param work - The function to execute within the transaction.
   * @returns The result of the function.
   */
  async execute<T>(work: (queryRunner: QueryRunner) => Promise<T>): Promise<T> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const result = await work(queryRunner);
      await queryRunner.commitTransaction();
      return result;
    } catch (error) {
      await queryRunner.rollbackTransaction();

      if (error instanceof Error) this.logger.error(error?.stack);
      throw error;
    } finally {
      await queryRunner.release();
    }
  }
}
