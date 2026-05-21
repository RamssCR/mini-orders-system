import { z } from 'zod';

export const env = z.object({
  NODE_ENV: z
    .enum(['development', 'test', 'staging', 'production'])
    .default('development'),
  PORT: z.coerce.number().int().positive().min(0).max(65536).default(3000),
  THROTTLER_TTL: z.coerce.number().positive().default(60),
  THROTTLER_LIMIT: z.coerce.number().positive().default(30),
  RABBITMQ_USER: z.string(),
  RABBITMQ_PASSWORD: z.string(),
});

export type Env = z.infer<typeof env>;
