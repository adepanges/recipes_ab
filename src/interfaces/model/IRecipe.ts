/**
  * @copyright Technical Test AccelByte
  * @author Ade Pangestu
**/
"use strict";

import { Types } from "mongoose";

export enum RecipeType {
    MAIN_COURSE = "main course",
    DESSERT = "dessert",
    APPETIZER = "appetizer",
    DRINK = "drink"
}

export interface IIngredient {
    _id?: Types.ObjectId;
    name: string;
    qty: string;
}

export interface IRecipe {
    _id?: Types.ObjectId;
    name: string;
    type: string;
    photos: string[];
    description: string;
    steps: string[];
    ingredients: IIngredient[];
}