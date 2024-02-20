import { Catch, ArgumentsHost } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import * as Sentry from '@sentry/node';

@Catch()
export class SentryFilter extends BaseExceptionFilter {
  /**
   * Catch exceptions thrown in the application.
   * @param exception The caught exception.
   * @param host The arguments host.
   */
  catch(exception: unknown, host: ArgumentsHost) {
    // Log the exception with Sentry for monitoring and alerting.
    Sentry.captureException(exception);

    // Attempt to handle the exception as an HTTP request if applicable.
    // This checks if the underlying framework supports the response.status method,
    // which is indicative of an HTTP request in NestJS.
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    if (response && typeof response.status === 'function') {
      // For HTTP requests, defer to the base NestJS exception filter handling.
      // This ensures proper HTTP status codes and error messages are returned.
      super.catch(exception, host);
    }
    // For non-HTTP requests (e.g., GraphQL, WebSockets), no further action is taken here.
    // NestJS and its integrations (e.g., Apollo Server for GraphQL) handle these errors appropriately,
    // typically without utilizing HTTP status codes in the same manner as REST APIs.
  }
}
