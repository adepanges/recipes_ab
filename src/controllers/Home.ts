/**
  * @copyright Technical Test AccelByte
  * @author Ade Pangestu
**/

"use strict";

import { Inject, Context, Controller, Get, Put, Post, Delete, View, BodyParams } from "@tsed/common";
import { Returns } from "@tsed/schema";

import B from "bluebird";
// import ServiceWeb from "../services/Web";

import BaseController from "./Base";
import { IRead } from "../interfaces/controller/IRead";
import { IWrite } from "../interfaces/controller/IWrite";

@Controller("/")
export class HomeController extends BaseController implements IRead, IWrite {

    // @Inject(ServiceWeb)
    // private service: ServiceWeb

    private categorySlug = ["batik-tulis"]

    @Get()
    @Returns(200).ContentType("text/html")
    @View("index.html")
    index(@Context() context: Context) {
        return { success: true };
    }
}
