import B from "bluebird";

import { Inject, Service } from "@tsed/common";
import { MongooseModel } from "@tsed/mongoose";

import Base from "./Base";
import Recipe from "./models/Recipe";

@Service()
export default class RecipeService extends Base {

    @Inject(Recipe)
    model: MongooseModel<Recipe>;

}