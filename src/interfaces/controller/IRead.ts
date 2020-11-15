/**
  * @copyright Technical Test AccelByte
  * @author Ade Pangestu
**/
"use strict";

import { IGlobal } from "./IGlobal";
import { Context } from "@tsed/common";

export interface IRead extends IGlobal {
    countAll?(context: Context): any;
    findAll?(context: Context): any;
    findActive?(context: Context): any;
    findById?(context: Context, id: string): any;
}