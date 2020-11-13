import { ResponseFilter, Context, ResponseFilterMethods } from "@tsed/common";

@ResponseFilter("text/html")
export default class HtmlResponseFilter implements ResponseFilterMethods {
    transform(data: any, context: Context) {
        console.log("HtmlResponseFilter transform", data);
        return data;
    }
}