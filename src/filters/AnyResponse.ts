/**
  * @copyright Technical Test AccelByte
  * @author Ade Pangestu
**/
"use strict";

import { ResponseFilter, Context, ResponseFilterMethods } from "@tsed/common";

@ResponseFilter("*/*")
export default class AnyResponseFilter implements ResponseFilterMethods {

    transform(data: any, ctx: Context) {
        // do something
        return data;
    }

}