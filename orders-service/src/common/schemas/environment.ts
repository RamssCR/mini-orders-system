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
});

export type Env = z.infer<typeof env>;
