import { env } from '#common/schemas/environment';
import { treeifyError } from 'zod';

const parsed = env.safeParse(process.env);

if (!parsed.success) {
  console.error(treeifyError(parsed.error)?.properties);
  process.exit(1);
}

export const {
  AUDIT_SERVICE_HOST,
  AUDIT_SERVICE_PORT,
  AUDIT_SERVICE_PROXY,
  DB_HOST,
  DB_NAME,
  DB_PASSWORD,
  DB_PORT,
  DB_USER,
  NODE_ENV,
  ORDERS_SERVICE_QUEUE,
  ORDERS_SERVICE_URLS,
} = parsed.data;
