import {
  ArgumentsHost,
  Catch,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { GqlArgumentsHost, GqlExceptionFilter } from '@nestjs/graphql';
import { logEvent } from '~/helper/log.helper';

@Catch()
export class AllExceptionsFilter implements GqlExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: unknown | any, host: ArgumentsHost): void {
    const gqlHost: any = GqlArgumentsHost.create(host);
    const args = gqlHost.args[1];
    const { httpAdapter } = this.httpAdapterHost;
    const { name, message, response } = exception;
    const ctx = gqlHost.switchToHttp();
    const { req: request } = gqlHost.args[2];
    const httpStatus =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.BAD_REQUEST;
    const { rawHeaders }: any = request;
    const data = request.body;
    const token = rawHeaders?.find((item: string) => item.startsWith('Bearer'));
    const messageResponse = response?.message ?? message;
    const contentLog = `DATA: ${JSON.stringify(data)}\nARGS: ${JSON.stringify(
      args,
    )}\nTOKEN: ${token}\nMESSAGE: ${messageResponse}\nCODE: ${httpStatus}\n======================== END LOG =========================`;
    logEvent(contentLog);
    console.log('================>>>: ctx.getResponse() = ', ctx.getResponse());
    return exception;
  }
}
