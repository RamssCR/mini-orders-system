import { z } from 'zod';

export const env = z.object({
  MONGO_USER: z.string(),
  MONGO_PASSWORD: z.string(),
  MONGO_NAME: z.string(),
});

export type Env = z.infer<typeof env>;
