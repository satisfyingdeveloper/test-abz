import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class ExceptionsFilter implements ExceptionFilter {
    catch(exception: unknown, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const status = exception instanceof HttpException
            ? exception.getStatus()
            : 500;
        const responseData = {
            success: false,
            ...(exception instanceof HttpException ? exception.getResponse() as object : { message: exception instanceof Error ? exception.message : exception.toString() }),
        };
        delete responseData['error'];
        delete responseData['statusCode'];

        response
            .status(status)
            .json(responseData);
    }
}
