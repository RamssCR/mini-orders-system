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
  MONGO_HOST,
  MONGO_NAME,
  MONGO_PASSWORD,
  MONGO_PORT,
  MONGO_USER,
} = parsed.data;
