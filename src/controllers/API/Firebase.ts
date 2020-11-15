/**
  * @copyright Technical Test AccelByte
  * @author Ade Pangestu
**/
"use strict";

import { Inject, Context, Controller, Get, Put, Post, Delete, QueryParams, Res, Req, Next, BodyParams } from "@tsed/common";
import { JsonResponse, Returns } from "@tsed/schema";

import B from "bluebird";
import FirebaseService from "../../services/Firebase";

import { IRead } from "../../interfaces/controller/IRead";
import { IWrite } from "../../interfaces/controller/IWrite";

@Controller("/firebase")
export class FirebaseAdminClient implements IRead, IWrite {

    private service = new FirebaseService();

    @Post("/storage/token")
    @Returns(200, Object).ContentType("application/json")
    getToken(@Context() context: Context, @BodyParams() payload: any) {
        return B.try(() => this.service.createCustomToken(context, {}));
    }
}
