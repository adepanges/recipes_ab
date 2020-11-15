/**
  * @copyright Technical Test AccelByte
  * @author Ade Pangestu
**/
"use strict";

import { Context } from "@tsed/common";

export interface IRead<D> {

    count(context: Context, conditions: any): any;
    find(context: Context, conditions: any, fields: string, options: any): any;
    findOne(context: Context, conditions: any, fields: string, options: any): any;
    findById(context: Context, _id: string | any, fields: string, options: any): any;

}