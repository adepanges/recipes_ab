/**
  * @copyright Technical Test AccelByte
  * @author Ade Pangestu
**/
"use strict";

import B from "bluebird";
import { v4 as uuidv4 } from "uuid";
import { Context } from "@tsed/common";
import firebaseAdmin, { initializeApp } from "firebase-admin";

import { FIREBASE_CONFIG, FIREBASE_DATABASE_URL, FIREBASE_STORAGE_BUCKET, FIREBASE_STORAGE_BASE_URL } from "../Config";

export default class Firebase {

    private App: any;
    private admin = firebaseAdmin;

    constructor(){
        B.try(() => {
            return this.App = initializeApp({
                credential: firebaseAdmin.credential.cert(FIREBASE_CONFIG),
                databaseURL: FIREBASE_DATABASE_URL
            });
        })
        .then((results) => {
            console.log("[FIREBASE] initializeApp Successfull");
        })
        .catch((error) => {
            console.error("[FIREBASE] initializeApp Error:", error);
        });
    }

    createCustomToken(context: Context, params?: any){
        const uid = uuidv4();
        const payload = {
            isCustomToken: true,
            type: "storage"
        };

        return this.App.auth().createCustomToken(uid, payload)
        .then((token: any) => {
            return {
                base_url: `${FIREBASE_STORAGE_BASE_URL}/${FIREBASE_STORAGE_BUCKET}`,
                uid,
                payload,
                token
            };
        })
        .catch((error: any) => {
            console.error("[FIREBASE] Error creating custom token:", error);
        });
    }
}