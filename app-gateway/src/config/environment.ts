import { env } from '#common/schemas/environment';
import { treeifyError } from 'zod';

const parsed = env.safeParse(process.env);

if (!parsed.success) {
  console.error(treeifyError(parsed.error)?.properties);
  process.exit();
}

export const {
  NODE_ENV,
  PORT,
  THROTTLER_LIMIT,
  THROTTLER_TTL,
  DB_HOST,
  DB_NAME,
  DB_PASSWORD,
  DB_PORT,
  DB_USER,
  MONGO_NAME,
  MONGO_PASSWORD,
  MONGO_USER,
  RABBITMQ_PASSWORD,
  RABBITMQ_USER,
} = parsed.data;
