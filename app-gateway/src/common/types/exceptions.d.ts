/**
 * Response type for RPC exceptions.
 */
export type RpcExceptionResponse = {
  message: string;
  status: number;
  isRpc: boolean;
};
