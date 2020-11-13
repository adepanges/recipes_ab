import { Catch, ExceptionFilterMethods, PlatformContext, ResourceNotFound } from "@tsed/common";

@Catch(ResourceNotFound)
export default class ResourceNotFoundFilter implements ExceptionFilterMethods {
    transform(data: any) {
        return { success: false, data };
    }

    async catch(exception: ResourceNotFound, context: PlatformContext) {
        const { response } = context;

        const obj = {
            status: exception.status,
            message: exception.message,
            url: exception.url
        };

        // Json response
        response
            .status(exception.status)
            .body(obj);

        // Or with ejs/handlers/etc...
        await response
            .status(exception.status)
            .render("404.ejs", obj);
    }
}