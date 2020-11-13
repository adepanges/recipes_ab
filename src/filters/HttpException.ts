import { Catch, PlatformContext, ExceptionFilterMethods, ResponseErrorObject } from "@tsed/common";
import { Exception } from "@tsed/exceptions";

@Catch(Exception)
export default class HttpExceptionFilter implements ExceptionFilterMethods {

    transform(data: any) {
        return { success: false, data };
    }

    catch(exception: Exception, context: PlatformContext) {
        const { response, logger } = context;
        const error = this.mapError(exception);
        const headers = this.getHeaders(exception);

        logger.error({
            error
        });

        response
            .setHeaders(headers)
            .status(error.status)
            .body(error);
    }

    mapError(error: any) {
        return {
            success: false,
            name: error.origin?.name || error.name,
            message: error.message,
            status: error.status || 500,
            stack: error.stack,
            errors: this.getErrors(error)
        };
    }

    protected getErrors(error: any) {
        return [error, error.origin].filter(Boolean).reduce((errs, { errors }: ResponseErrorObject) => {
            return [...errs, ...(errors || [])];
        }, []);
    }

    protected getHeaders(error: any) {
        return [error, error.origin].filter(Boolean).reduce((obj, { headers }: ResponseErrorObject) => {
            return {
                ...obj,
                ...(headers || {})
            };
        }, {});
    }
}