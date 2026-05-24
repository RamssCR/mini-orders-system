import { env } from '#common/schemas/environment';
import { treeifyError } from 'zod';

const parsed = env.safeParse(process.env);

if (!parsed.success) {
  console.error(treeifyError(parsed.error)?.properties);
  process.exit();
}

export const {
  ALLOWED_ORIGINS,
  AUDIT_SERVICE_HOST,
  AUDIT_SERVICE_PORT,
  AUDIT_SERVICE_PROXY,
  NODE_ENV,
  ORDERS_SERVICE_PROXY,
  ORDERS_SERVICE_QUEUE,
  ORDERS_SERVICE_URLS,
  PORT,
  RABBITMQ_PASSWORD,
  RABBITMQ_USER,
  THROTTLER_LIMIT,
  THROTTLER_TTL,
} = parsed.data;
