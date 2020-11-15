/**
  * @copyright Technical Test AccelByte
  * @author Ade Pangestu
**/
"use strict";

import { Env } from "@tsed/core";
import dotenv from "dotenv";
import fs from "fs";

let envFile = ".env";
let firebaseFile = "./firebase.config.json";
let errorCount = 0;
let firebaseConfig: any = null;

export const NODE_ENV = String(process.env.NODE_ENV);
let ENVIRONMENT_NAME: "PROD" | "DEV" | "TEST";
switch (NODE_ENV) {
    case "production":
        ENVIRONMENT_NAME = "PROD";
        envFile = ".env_production";
        firebaseFile = "./firebase-production.json";
        break;
    case "development":
        ENVIRONMENT_NAME = "DEV";
        envFile = ".env_uat";
        firebaseFile = "./firebase-uat.json";
        break;
}

export const ENVIRONMENT: Env = Env[ENVIRONMENT_NAME];
console.log(`ENVIRONMENT: ${ENVIRONMENT}`);

if (fs.existsSync(envFile)) {
    console.log(`Using "${envFile}" file to supply config Environment Variables`);
    dotenv.config({ path: envFile });
} else if (fs.existsSync(".env")) {
    console.log("Using \".env\" file to supply config Environment Variables");
    dotenv.config({ path: ".env" });
}

if (fs.existsSync(firebaseFile)) {
    console.log(`Using "${firebaseFile}" file to supply Firebase Config`);
    firebaseConfig = JSON.parse(fs.readFileSync(firebaseFile, { encoding: "utf8", flag: "r" }));
} else if (fs.existsSync("./firebase.config.json")) {
    console.log("Using \"firebase.config.json\" file to supply Firebase Config");
    firebaseConfig = JSON.parse(fs.readFileSync("./firebase.config.json", { encoding: "utf8", flag: "r" }));
}

if(!firebaseConfig) {
    firebaseConfig = {
        "type": process.env["SECRET_FIREBASE_TYPE"] || "",
        "project_id": process.env["SECRET_FIREBASE_PROJECT_ID"] || "",
        "private_key_id": process.env["SECRET_FIREBASE_PRIVATE_KEY_ID"] || "",
        "private_key": process.env["SECRET_FIREBASE_PRIVATE_KEY"] || "",
        "client_email": process.env["SECRET_FIREBASE_CLIENT_EMAIL"] || "",
        "client_id": process.env["SECRET_FIREBASE_CLIENT_ID"] || "",
        "auth_uri": process.env["SECRET_FIREBASE_AUTH_URI"] || "",
        "token_uri": process.env["SECRET_FIREBASE_TOKEN_URI"] || "",
        "auth_provider_x509_cert_url": process.env["SECRET_FIREBASE_AUTH_PROVIDER_X509_CERT_URL"] || "",
        "client_x509_cert_url": process.env["SECRET_FIREBASE_CLIENT_X509_CERT_URL"] || "",
    };
}

export const SESSION_SECRET = process.env["SESSION_SECRET"];
export const RECIPES_AB_URL = process.env["RECIPES_AB_URL"] || "http://localhost:3000";
export const RECIPES_AB_PORT = process.env.PORT || process.env["RECIPES_AB_PORT"] || 3000;
export const RECIPES_AB_MONGODB_URI = process.env["RECIPES_AB_MONGODB_URI"] || "";
export const FIREBASE_CONFIG = firebaseConfig;
export const FIREBASE_DATABASE_URL = process.env["FIREBASE_DATABASE_URL"] || "";
export const FIREBASE_STORAGE_BUCKET = process.env["FIREBASE_STORAGE_BUCKET"] || "";
export const FIREBASE_STORAGE_BASE_URL = process.env["FIREBASE_STORAGE_BASE_URL"] || "";
export const WHITELIST_ORIGIN = ["http://localhost:3000", "http://localhost:8080", "https://recipes-ab.herokuapp.com"];

if (!RECIPES_AB_PORT) {
    console.log("No RECIPES_AB_PORT provided. Please set RECIPES_AB_PORT environment variable.");
    errorCount++;
}
/*
if (!SESSION_SECRET) {
    console.log("No client secret provided. Please set SESSION_SECRET environment variable.");
    errorCount++;
}
*/

if (!RECIPES_AB_MONGODB_URI) {
    console.log("No mongo connection string provided. Please set RECIPES_AB_MONGODB_URI environment variable.");
    errorCount++;
}

if (!FIREBASE_DATABASE_URL) {
    console.log("No firebase database url provided. Please set FIREBASE_DATABASE_URL environment variable.");
    errorCount++;
}

// if (errorCount) process.exit(1);