import { z } from 'zod';

export const env = z.object({
  ALLOWED_ORIGIN: z.url(),
  NODE_ENV: z
    .enum(['development', 'test', 'staging', 'production'])
    .default('development'),
  PORT: z.coerce.number().int().positive().min(0).max(65536).default(3000),
  THROTTLER_TTL: z.coerce.number().positive().default(60),
  THROTTLER_LIMIT: z.coerce.number().positive().default(30),
  RABBITMQ_NAME: z.string(),
  RABBITMQ_USER: z.string(),
  RABBITMQ_PASSWORD: z.string(),
  RABBITMQ_QUEUE: z.string(),
  RABBITMQ_URLS: z.string().transform((value) => value.trim().split(',')),
  TCP_NAME: z.string(),
  TCP_HOST: z.string().default('localhost'),
  TCP_PORT: z.coerce.number().int().positive().min(0).max(65536),
});

export type Env = z.infer<typeof env>;
