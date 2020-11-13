/**
  * @copyright Technical Test AccelByte
  * @author Ade Pangestu
**/

import B from "bluebird";

import { Context } from "@tsed/common";
import { Document} from "mongoose";

import { IRead } from "../interfaces/service/IRead";
import { IWrite } from "../interfaces/service/IWrite";
import { ObjectId } from "mongodb";

export default class Base implements IRead<Document>, IWrite<Document> {

    public _defaultSort = "_id";
    public _defaultLimit = 10;
    public model: any;
    public preSave: any = null;
    public transformer: any = null;

    constructor (
        _options?: {
            defaultSort?: string;
            defaultLimit?: number;
        }
    ) {
        if (_options){
            if (_options.defaultSort) this._defaultSort = _options.defaultSort;
            if (_options.defaultLimit) this._defaultLimit = _options.defaultLimit;
        }
    }

    count(context: Context, conditions?: any) {
        conditions.is_deleted = false;
        return B.try(() => this.model.count(conditions || {}));
    }

    findOneActive(context: Context, conditions?: any, fields?: string, options?: any) {
        conditions.is_active = true;
        conditions.is_deleted = false;
        this.attachDefaultOptionsCriteria(context, options);
        return B.try(() => this.model.findOne(conditions || {}, fields || "", options).lean())
        .then(document => this.transformer ? this.transformer([document]) : [document])
        .then(documents => documents && documents[0]);
    }

    findActive(context: Context, conditions?: any, fields?: string, options?: any) {
        conditions.is_active = true;
        conditions.is_deleted = false;
        this.attachDefaultOptionsCriteria(context, options);
        return B.try(() => this.model.find(conditions || {}, fields || "", options).lean())
        .then(documents => this.transformer ? this.transformer(documents) : documents);
    }

    find(context: Context, conditions?: any, fields?: string, options?: any){
        conditions.is_deleted = false;
        this.attachDefaultOptionsCriteria(context, options);

        console.log("this.model", this.model);

        return B.try(() => this.model.find(conditions || {}, fields || "", options).lean())
        .then(documents => this.transformer ? this.transformer(documents) : documents);
    }

    findOne(context: Context, conditions?: any, fields?: string, options?: any) {
        return B.try(() => this.model.findOne(conditions || {}, fields || "", options).lean())
        .then(document => this.transformer ? this.transformer([document]) : [document])
        .then(documents => documents && documents[0]);
    }

    findById(context: Context, _id: ObjectId, fields?: string, options?: any) {
        return B.try(() => this.model.findById(_id, fields || "", options).lean())
        .then(document => this.transformer ? this.transformer([document]) : [document])
        .then(documents => documents && documents[0]);
    }

    create(context: Context, document: any) {
        return B.try(() => {
            return this.preSave ? this.preSave(document) : document;
        })
        .then(() => (new this.model(document)).save());
    }

    update(context: Context, conditions: any, document: Document | any) {
        return B.try(() => {
            return this.preSave ? this.preSave(document) : document;
        })
        .then(() => this.model.updateOne(conditions, document));
    }

    updateById(context: Context, _id: ObjectId, document: Document | any) {
        return B.try(() => {
            return this.preSave ? this.preSave(document) : document;
        })
        .then(() => this.model.updateOne({ _id }, document));

    }

    delete(context: Context, conditions: any) {
        return B.try(() => this.model.updateOne(conditions, { is_active: false, is_deleted: true,  deleted_at: new Date }));
    }

    deleteById(context: Context, _id: ObjectId) {
        return B.try(() => this.model.updateOne({ _id }, { is_active: false, is_deleted: true, deleted_at: new Date }));
    }

    updateMany(context: Context, conditions: any, document: any) {
        return B.try(() => this.model.updateMany(conditions, document));
    }

    deleteMany(context: Context, conditions: any) {
        return B.try(() => this.model.updateMany(conditions, { is_deleted: true, deleted_at: new Date }));
    }

    attachDefaultOptionsCriteria(context: Context, options: any){
        ; (!options) ? options = {} : null;
        options.sort = options.sort || this._defaultSort;
        options.skip = parseInt(options.skip) || 0;
        options.limit = (typeof options.limit != "undefined") ? parseInt(options.limit) : this._defaultLimit;
    }

}