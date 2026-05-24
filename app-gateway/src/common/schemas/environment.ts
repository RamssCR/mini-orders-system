import { z } from 'zod';

export const env = z.object({
  ALLOWED_ORIGINS: z.url().optional(),
  NODE_ENV: z
    .enum(['development', 'test', 'staging', 'production'])
    .default('development'),
  PORT: z.coerce.number().int().positive().min(0).max(65536).default(3000),
  THROTTLER_TTL: z.coerce.number().positive().default(60),
  THROTTLER_LIMIT: z.coerce.number().positive().default(30),
  RABBITMQ_USER: z.string(),
  RABBITMQ_PASSWORD: z.string(),
  ORDERS_SERVICE_PROXY: z.string(),
  ORDERS_SERVICE_QUEUE: z.string(),
  ORDERS_SERVICE_URLS: z.string().transform((value) => value.trim().split(',')),
  AUDIT_SERVICE_PROXY: z.string(),
  AUDIT_SERVICE_HOST: z.string().default('localhost'),
  AUDIT_SERVICE_PORT: z.coerce.number().int().positive().min(0).max(65536),
});

export type Env = z.infer<typeof env>;
