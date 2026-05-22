import { env } from '#common/schemas/environment';
import { treeifyError } from 'zod';

const parsed = env.safeParse(process.env);

if (!parsed.success) {
  console.error(treeifyError(parsed.error)?.properties);
  process.exit(1);
}

export const {
  DB_HOST,
  DB_NAME,
  DB_PASSWORD,
  DB_PORT,
  DB_USER,
  NODE_ENV,
  RABBITMQ_QUEUE,
  RABBITMQ_URLS,
} = parsed.data;
