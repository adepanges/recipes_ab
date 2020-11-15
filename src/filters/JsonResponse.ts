/**
  * @copyright Technical Test AccelByte
  * @author Ade Pangestu
**/
"use strict";

import { ResponseFilter, Context, ResponseFilterMethods } from "@tsed/common";

@ResponseFilter("application/json")
export default class JsonResponseFilter implements ResponseFilterMethods {
    transform(data: any, context: Context) {
        console.log("JsonResponseFilter transform", data);
        return { success: true, data };
    }
}