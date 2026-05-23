import { z } from 'zod';

export const env = z.object({
  NODE_ENV: z
    .enum(['development', 'test', 'staging', 'production'])
    .default('development'),
  DB_HOST: z.string().default('localhost'),
  DB_USER: z.string(),
  DB_PASSWORD: z.string(),
  DB_PORT: z.coerce.number().positive().default(5432),
  DB_NAME: z.string(),
  RABBITMQ_URLS: z.string().transform((value) => value.trim().split(',')),
  RABBITMQ_QUEUE: z.string(),
  TCP_NAME: z.string(),
  TCP_HOST: z.string().default('localhost'),
  TCP_PORT: z.coerce.number().int().positive().min(0).max(65536),
});

export type Env = z.infer<typeof env>;
