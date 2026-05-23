export const ORDER_STATUS = [
  'pending',
  'paid',
  'completed',
  'cancelled',
] as const;

export type Status = (typeof ORDER_STATUS)[number];
