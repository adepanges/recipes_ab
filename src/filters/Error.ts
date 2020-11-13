import { Catch, PlatformContext, ExceptionFilterMethods, ResponseErrorObject } from "@tsed/common";
import { Exception } from "@tsed/exceptions";

@Catch(Error)
export default class ErrorFilter implements ExceptionFilterMethods {

    transform(data: any) {
        return { success: false, data };
    }

    catch(exception: Exception, ctx: PlatformContext) {
        const { response, logger } = ctx;
        const error = this.mapError(exception);
        const headers = this.getHeaders(exception);

        logger.error({
            error
        });

        response
            .setHeaders(headers)
            .status(error.status || 500)
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
        return error;
        /*
        return [error, error.origin].filter(Boolean).reduce((errs, { errors }: ResponseErrorObject) => {
            return [...errs, ...Object.assign({}, errors)];
        }, []);
        */
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