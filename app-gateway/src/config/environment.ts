import { env } from '#common/schemas/environment';
import { treeifyError } from 'zod';

const parsed = env.safeParse(process.env);

if (!parsed.success) {
  console.error(treeifyError(parsed.error)?.properties);
  process.exit();
}

export const {
  ALLOWED_ORIGIN,
  NODE_ENV,
  PORT,
  RABBITMQ_NAME,
  RABBITMQ_PASSWORD,
  RABBITMQ_QUEUE,
  RABBITMQ_URLS,
  RABBITMQ_USER,
  TCP_HOST,
  TCP_NAME,
  TCP_PORT,
  THROTTLER_LIMIT,
  THROTTLER_TTL,
} = parsed.data;
