import { Inject, Catch, PlatformContext, ExceptionFilterMethods, ResponseErrorObject, PlatformViews } from "@tsed/common";
import { Exception } from "@tsed/exceptions";

@Catch(Exception)
export default class HttpExceptionFilter implements ExceptionFilterMethods {

    @Inject()
    platformViews: PlatformViews;

    transform(data: any) {
        return data
    }

    async catch(exception: Exception, context: PlatformContext) {
        const { response, logger } = context;
        const error = this.mapError(exception);
        const headers = this.getHeaders(exception);

        logger.error({
            error
        });
        const result = await this.platformViews.render("500.njk", error);

        await response
            .setHeaders(headers)
            .status(error.status)
            .body(result);
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