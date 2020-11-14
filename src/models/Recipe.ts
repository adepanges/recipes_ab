"use strict";
/**
  * @copyright 2020 - Batik Giri Alam
  * @author Ade Pangestu
**/

import { Property } from "@tsed/schema";
import { Model } from "@tsed/mongoose";
import { Default, Enum, Required } from "@tsed/schema";

import { IRecipe, IIngredient, RecipeType } from "../interfaces/model/IRecipe";
import { Base } from "./Base";

@Model()
export class Ingredient extends Base implements IIngredient {

    @Property()
    @Required()
    name: string;

    @Property()
    @Required()
    qty: string;

}

@Model({
	schemaOptions: {
        collection: "recipes",
		timestamps: {
			createdAt: "created_at",
			updatedAt: "updated_at"
		}
	}
})
export default class Recipe extends Base implements IRecipe {

    @Property()
    @Required()
    @Enum(RecipeType)
	type: string;

    @Property()
    @Required()
	name: string;

    @Property()
    photos: string[];

    @Property()
    @Default("")
    description: string;

    @Property()
    steps: string[];

    @Property()
    ingredients: Ingredient[];
}