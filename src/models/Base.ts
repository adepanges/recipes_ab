/**
  * @copyright Technical Test AccelByte
  * @author Ade Pangestu
**/

import { Property } from "@tsed/schema";
import { IBase } from "../interfaces/model/IBase";
import { Default } from "@tsed/schema";
import { Model, ObjectID } from "@tsed/mongoose";

@Model()
export class Base implements IBase {

    @Property()
    _id: ObjectID;

    @Property()
    @Default(true)
    is_active: boolean;

    @Property()
    @Default(false)
    is_deleted: boolean;

    @Property()
    created_at: Date;

    @Property()
    updated_at: Date;

    @Default(null)
    @Property()
    deleted_at: Date;
}