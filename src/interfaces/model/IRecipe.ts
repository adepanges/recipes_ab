/**
  * @copyright Technical Test AccelByte
  * @author Ade Pangestu
**/

import { Types } from "mongoose";

export enum RecipeType {
    MAIN_COURSE = "Main Course",
    DESSERT = "Dessert",
    APPETIZER = "Appetizer",
    DRINK = "Drink"
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