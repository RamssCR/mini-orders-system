import { z } from 'zod';

export const env = z.object({
  MONGO_USER: z.string(),
  MONGO_PASSWORD: z.string(),
  MONGO_NAME: z.string(),
  MONGO_HOST: z.string().default('localhost'),
  MONGO_PORT: z.coerce.number().int().positive().default(27017),
});

export type Env = z.infer<typeof env>;
