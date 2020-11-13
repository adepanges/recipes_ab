/**
  * @copyright Technical Test AccelByte
  * @author Ade Pangestu
**/

import { Context } from "@tsed/common";

export interface IWrite<D> {

    create(context: Context, item: any): any;
    update(context: Context, conditions: any, item: D | any): any;
    delete(context: Context, conditions: any): any;

}