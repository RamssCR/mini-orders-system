import {
  CallHandler,
  ExecutionContext,
  HttpException,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, catchError, throwError } from 'rxjs';
import { RpcExceptionResponse } from '#common/types/exceptions';

@Injectable()
export class RpcToHttpInterceptor implements NestInterceptor {
  /**
   * Converts a RPC error object to an HTTP exception.
   * @param _context - The request context.
   * @param next - The next middleware handler.
   * @returns An observable that throws an converted-RPC exception (in case one arrives).
   */
  intercept(
    _context: ExecutionContext,
    next: CallHandler<unknown>,
  ): Observable<unknown> {
    return next.handle().pipe(
      catchError((error: unknown) => {
        if (this.isRpcError(error))
          return throwError(
            () => new HttpException(error.message, error.status),
          );

        return throwError(() => error as HttpException);
      }),
    );
  }

  /**
   * Dynamically validates if an unknown error matches the RpcExceptionResponse type.
   * @param error - The error to validate.
   * @returns A compiler assertion that the error matches the RpcExceptionResponse type.
   */
  private isRpcError(error: unknown): error is RpcExceptionResponse {
    return (
      typeof error === 'object' &&
      error !== null &&
      'isRpc' in error &&
      error.isRpc === true
    );
  }
}
