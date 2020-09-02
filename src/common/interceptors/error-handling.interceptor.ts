import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler
} from "@nestjs/common";

import {
    Observable,
    throwError
} from "rxjs";

import {
    catchError
} from 'rxjs/operators'

/**
 * @import Utils
 */
import { errorTransformer } from '../utils/error.util';

/**
 * This will catch any errors thrown by router/controller and onwards.
 * We will try and convert errors that are not already HttpExceptions to be HttpExceptions for return to the
 * client.
 * 
 * This interceptor will fire AFTER the controller errors our and BEFORE a nest filter
 *
 * @export
 * @class ErrorHandlingInterceptor
 * @implements {NestInterceptor}
 */
@Injectable()
export class ErrorHandlingInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {

        return next
            .handle()
            .pipe(
                catchError((err: any) => {
                    return throwError(errorTransformer(err));
                })
            );
    }
}