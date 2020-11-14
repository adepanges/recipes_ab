/**
  * @copyright Technical Test AccelByte
  * @author Ade Pangestu
**/

"use strict";

import { Env } from "@tsed/core";
import { RECIPES_AB_PORT, ENVIRONMENT, RECIPES_AB_MONGODB_URI, WHITELIST_ORIGIN } from "./Config";
import { Configuration, Inject, PlatformApplication, Constant } from "@tsed/common";
import "@tsed/mongoose";
import * as Path from "path";
import cors from "cors";
import bodyParser from "body-parser";
import compression from "compression";
import cookieParser from "cookie-parser";
import methodOverride from "method-override";
import helmet from "helmet";
import nunjucks from "nunjucks";

import QueryCriteriaMiddleware from "./middlewares/QueryCriteria";

import HtmlResponseFilter from "./filters/HtmlResponse";
import JsonResponseFilter from "./filters/JsonResponse";
import HttpExceptionFilter from "./filters/HttpException";
import ErrorFilter from "./filters/Error";
import ResourceNotFoundFilter from "./filters/ResourceNotFound";
import AnyResponseFilter from "./filters/AnyResponse";

// Controllers
import Routes from "./controllers/Routes";

const rootDir = Path.resolve(__dirname);
const clientDir = Path.join(rootDir, "public");
const viewsDir = Path.join(rootDir, "resources","views");

console.log("viewsDir", viewsDir)

@Configuration({
    rootDir,
    acceptMimes: ["application/json"],
    env: ENVIRONMENT,
    port: RECIPES_AB_PORT,
    debug: false,
    uploadDir: `${rootDir}/uploads`,
    mount: Routes,
    views: {
        root: viewsDir,
        viewEngine: "nunjucks",
        extensions: {
            "html": "nunjucks",
            "njk": "nunjucks"
        },
        options: {
            nunjucks: {
                requires: nunjucks.configure(viewsDir)
            }
        }
    },
    statics: {
        "/": clientDir
    },
    mongoose: [
        {
            id: "default",
            url: RECIPES_AB_MONGODB_URI,
            connectionOptions: {
                useNewUrlParser: true,
                useCreateIndex: true,
                useUnifiedTopology: true
            }
        },
    ],
    responseFilters: [
        ResourceNotFoundFilter,
        ErrorFilter,
        HttpExceptionFilter,
        HtmlResponseFilter,
        JsonResponseFilter,
        AnyResponseFilter,
    ]
})
export default class Server {

    @Inject()
    app: PlatformApplication;

    @Configuration()
    settings: Configuration;

    @Constant("viewsDir")
    viewsDir: string;

    @Constant("env")
    env: Env;

    $beforeRoutesInit(): void | Promise<any> {
        if (this.env === Env.PROD) {
            // do something
        }

        this.app
            .use(cors({
                origin: function (origin: any, callback: any) {
                    console.log("origin", origin);
                    if (!origin || WHITELIST_ORIGIN.includes(origin)) {
                        callback(null, true);
                    } else {
                        callback(new Error("Not allowed by CORS"));
                    }
                }
            }))
            .use(helmet())
            .use(cookieParser())
            .use(compression())
            .use(methodOverride())
            .use(bodyParser.json())
            .use(bodyParser.urlencoded({
                extended: true
            }));

        this.app.use(QueryCriteriaMiddleware);
    }

    $afterRoutesInit() {
        this.app.get("/", (req: any, res: any) => {
            if (!res.headersSent) {
                // prevent index.html caching
                res.set({
                    "Cache-Control": "no-cache, no-store, must-revalidate",
                    "Pragma": "no-cache"
                });
            }
        });
        this.app.get(/^\/(recipe)\/.+$/, (req: any, res: any) => {
            console.log("asu palah mengeneh");
            res.sendFile(Path.join(clientDir, "index.html"));
        });
    }
}