/**
  * @copyright Technical Test AccelByte
  * @author Ade Pangestu
**/

import { Env } from "@tsed/core";
import dotenv from "dotenv";
import fs from "fs";

let envFile = ".env_production";
let firebaseFile = "./firebase-production.json";
let errorCount = 0;
let firebaseConfig: any = null;

export const NODE_ENV = String(process.env.NODE_ENV);
let ENVIRONMENT_NAME: "PROD" | "DEV" | "TEST";
switch (NODE_ENV) {
    case "production":
        ENVIRONMENT_NAME = "PROD";
        envFile = ".env_production";
        firebaseFile = ".firebase-production.json";
        break;
    case "development":
        ENVIRONMENT_NAME = "DEV";
        envFile = ".env_uat";
        firebaseFile = "./firebase-uat.json";
        break;
}

export const ENVIRONMENT: Env = Env[ENVIRONMENT_NAME];
console.log(`ENVIRONMENT: ${ENVIRONMENT}`);


if (!fs.existsSync(envFile)) {
    console.log(`ENV not found: ${envFile}`);
    errorCount++;
} else {
    console.log(`Using "${envFile}" file to supply config Environment Variables`);
    dotenv.config({ path: envFile });
}

if (!fs.existsSync(firebaseFile)) {
    console.log(`Firebase config not found: ${firebaseFile}`);
    errorCount++;
} else {
    console.log(`Using "${firebaseFile}" file to supply Firebase Config`);
    firebaseConfig = JSON.parse(fs.readFileSync(firebaseFile, { encoding: "utf8", flag: "r" }));
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

if (!SESSION_SECRET) {
    console.log("No client secret provided. Please set SESSION_SECRET environment variable.");
    errorCount++;
}

if (!RECIPES_AB_MONGODB_URI) {
    console.log("No mongo connection string provided. Please set RECIPES_AB_MONGODB_URI environment variable.");
    errorCount++;
}

if (!FIREBASE_DATABASE_URL) {
    console.log("No firebase database url provided. Please set FIREBASE_DATABASE_URL environment variable.");
    errorCount++;
}

// if (errorCount) process.exit(1);