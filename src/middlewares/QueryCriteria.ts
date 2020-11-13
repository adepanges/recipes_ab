import B from "bluebird";
import { Context, IMiddleware, Middleware, Req, Next, QueryParams } from "@tsed/common";
import { BadRequest, Forbidden, NotFound } from "@tsed/exceptions";

import { IQueryCriteria } from "../interfaces/QueryCriteria";

class QueryCriteria implements IQueryCriteria {

    public filter: any;
    public fields: string;
    public options: any;
    public page: number;

    constructor() {
        this.reset();
    }

    reset(){
        this.filter = {};
        this.fields = "";
        this.page = 1;
        this.options = {
            skip: 0,
            limit: 10,
            sort: null
        };
    }

    injectFilter(filter: any) {
        for (const p in filter) {
            if (filter[p] !== undefined) {
                this.filter[p] = filter[p];
            }
        }
    }

    toQS() {
        return {
            filter: this.filter,
            fields: this.fields,
            page: this.options.page,
            limit: this.options.limit,
            sort: this.options.sort
        };
    }

    attach(context: Context, query: any, next: Next){
        const criteria = context.get("criteria");
        criteria.reset();

        return B.try(() => {

            if (query.options) {
                if (typeof query.options !== "object") {
                    query.options = JSON.parse(query.options);
                }
                else {
                    query.options = query.options;
                }
            }

            if (query.page !== undefined) {
                criteria.page = parseInt(query.page);
                if (isNaN(criteria.page)) {
                    throw new BadRequest("query paramater 'page' should be a valid number");
                }
            }

            if (query.limit !== undefined) {
                criteria.options.limit = parseInt(query.limit);
                if (isNaN(criteria.options.limit)) {
                    throw new BadRequest("query paramater 'limit' should be a valid number");
                }
            }

            if (query.sort !== undefined && typeof (query.sort) == "string") {
                try {
                    criteria.options.sort = JSON.parse(query.sort);
                } catch (err) {
                    criteria.options.sort = query.sort.split(",").join(" ");
                }
            }

            if (query.filter) {
                try {
                    if (
                        query.filter &&
                        typeof query.filter != "object"
                    ) {
                        criteria.filter = JSON.parse(query.filter);
                        if (!Object.keys(criteria.filter).length)
                            criteria.filter = {};
                    }
                    else {
                        criteria.filter = query.filter;
                    }
                }
                catch (e) {
                    throw new BadRequest("query parameter 'filter' is not a valid json");
                }
            }

            if (query.fields !== undefined) {
                criteria.fields = query.fields.split(",").join(" ");
            } else {
                criteria.fields = "";
            }

            criteria.options.skip = (criteria.page - 1) * criteria.options.limit;

            context.set("criteria", criteria);
            console.log("criteria", criteria);

            next();

        });
    }
}

@Middleware()
export default class QueryCriteriaMiddleware implements IMiddleware {
    use(@Context() context: Context, @QueryParams() query: any, @Next() next: Next) {
        if (!context.has("criteria")) {
            context.set("criteria", new QueryCriteria);
        }

        try {
            context.get("criteria").attach(context, query, next);
        } catch (err) {
            throw err;
        }
    }
}