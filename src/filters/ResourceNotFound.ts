/**
  * @copyright Technical Test AccelByte
  * @author Ade Pangestu
**/
"use strict";

import { Inject, Catch, ExceptionFilterMethods, PlatformContext, ResourceNotFound, PlatformViews } from "@tsed/common";

@Catch(ResourceNotFound)
export default class ResourceNotFoundFilter implements ExceptionFilterMethods {

    @Inject()
    platformViews: PlatformViews;

    transform(data: any) {
        return data
    }

    async catch(exception: ResourceNotFound, context: PlatformContext) {
        const { response } = context;

        const obj = {
            status: exception.status,
            message: exception.message,
            url: exception.url
        };
        const result = await this.platformViews.render("400.njk", obj);

        await response
        .status(exception.status)
        .body(result);
    }
}