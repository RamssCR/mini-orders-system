import {
  ArgumentsHost,
  Catch,
  Logger,
  RpcExceptionFilter,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { RpcException } from '@nestjs/microservices';
import { RpcExceptionResponse } from '#common/types/exceptions';

@Catch(RpcException)
export class CustomRpcExceptionFilter implements RpcExceptionFilter<RpcException> {
  private readonly logger = new Logger('RcpExceptionFilter');

  /**
   * Handles RPC exceptions for Request-Response requests.
   * @param exception - The exception caught after failure.
   * @param _host - The global context object.
   * @returns An observable that resolves when the custom RPC error object is sent.
   */
  catch(exception: RpcException, _host: ArgumentsHost): Observable<unknown> {
    const error = exception.getError();

    const message =
      typeof error === 'string'
        ? error
        : (error as RpcExceptionResponse).message;
    const status =
      typeof error === 'object' ? (error as RpcExceptionResponse).status : 500;

    this.logger.error(`Error in microservice: ${exception.message}`);
    return throwError(() =>
      new RpcException({ status, message, isRpc: true }).getError(),
    );
  }
}
