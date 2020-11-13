"use strict";

import { Inject, Context, Controller, Get, Put, Post, Delete, BodyParams, PathParams } from "@tsed/common";
import { Returns } from "@tsed/schema";

import B from "bluebird";
import { ObjectId } from "mongodb";

import Base from "../Base";
import Recipe from "../../services/models/Recipe";
import RecipeService from "../../services/Recipe";

import { IRead } from "../../interfaces/controller/IRead";
import { IWrite } from "../../interfaces/controller/IWrite";

@Controller("/recipes")
export class ApiRecipeController extends Base implements IRead, IWrite {

    @Inject(RecipeService)
    private service: RecipeService;

    @Get()
    @Returns(200, Recipe).ContentType("application/json")
    find(@Context() context: Context) {
        const { filter, fields, options } = context.get("criteria");
        return B.try(() => this.service.find(context, filter, fields, options));
    }

    @Get("/count")
    @Returns(200, Number).ContentType("application/json")
    count(@Context() context: Context) {
        const { filter } = context.get("criteria");
        return B.try(() => this.service.count(context, filter));
    }

    @Post()
    @Returns(200, Recipe).ContentType("application/json")
    create(@Context() context: Context, @BodyParams() payload: Recipe) {
        return B.try(() => {
            // data validation
        })
        .then(() => this.service.create(context, payload));
    }

    @Put("/:id")
    @Returns(200, Recipe).ContentType("application/json")
    updateById(@Context() context: Context, @PathParams("id") id: ObjectId, @BodyParams() payload: Recipe) {
        return B.try(() => {
            // data validation
        })
        .then(() => this.service.updateById(context, id, payload));
    }

    @Delete("/:id")
    @Returns(200, Recipe).ContentType("application/json")
    deleteById(@Context() context: Context, @PathParams("id") id: ObjectId) {
        return B.try(() => {
            // data validation
        })
        .then(() => this.service.deleteById(context, id));
    }

}