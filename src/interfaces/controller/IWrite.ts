/**
  * @copyright Technical Test AccelByte
  * @author Ade Pangestu
**/

import { IGlobal } from "./IGlobal";
import { Context } from "@tsed/common";

export interface IWrite extends IGlobal {
    create?(context: Context, payload: any): any;
    update?(context: Context, id: string, payload: any): any;
    updateMany?(context: Context, payload: any): any;
    delete?(context: Context, id: string): any;
    deleteMany?(context: Context): any;

}