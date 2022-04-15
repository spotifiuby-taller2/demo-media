require('dotenv').config({
    path: `.env${process.env
        .MY_ENV}`
});

const MAX_STR_LEN = 254;
const FIREBASE_MAX_LEN = 36;
const BCRYPT_LEN = 60;
const SHA_LEN = 64;

const MIN_STR_LEN = 2;
const MIN_PASS_LEN = 10;
const DATE_FORMAT = "YYYY-M-D H:mm:ss.SS";
const TIMEZONE = "America/Buenos_Aires";
const SYMBOL_MAX_LEN = 10;
const TIMESTAMP_MAX_LEN = 30;

const JSON_HEADER = {
    'Content-Type': 'application/json'
}

const LOG_LEVEL = process.env.LOG_LEVEL;

const RESET_DATABASE = false;

/* Frontend hosts */
const BACKOFFICE_HOST = process.env.BACKOFFICE_HOST;
const AUTH_FRONT = process.env.AUTH_FRONT;
const USERS_HOST = process.env.USERS_HOST;


/* Frontend paths */

/* Backends paths */
const SONG_URL = "/song"

/* ====== Production vs Development config ====== */
const isDevelopment = process.env.PRODUCTION === undefined;
let databaseUrl;
let firebaseConfig;

const DB_DIALECT = "postgres";
let DB_USER;
let DB_PASSWORD;
let DB_HOST;
let DB_PORT;
let POSTGRES_DB;
let firebaseJson;

if (isDevelopment) {

    if (process.env.DATABASE_URL === undefined) {
        DB_USER = process.env.POSTGRES_USER;
        DB_PASSWORD = process.env.POSTGRES_PASSWORD;
        DB_HOST = process.env.DB_HOST;
        DB_PORT = process.env.DB_PORT;
        POSTGRES_DB = process.env.POSTGRES_DB;

        databaseUrl = `${process.env.DB}`
            .concat(`://${DB_USER}`)
            .concat(`:${DB_PASSWORD}`)
            .concat(`@${DB_HOST}`)
            .concat(`:${DB_PORT}`)
            .concat(`/${POSTGRES_DB}`);
        console.log(databaseUrl)
    } else {
        databaseUrl = process.env.DATABASE_URL;
    }

    firebaseConfig = {
        apiKey: "AIzaSyDlFbw1n3eqg7ogdwGuiTetV6isK4Uhqno",
        authDomain: "fir-firebase-acc6b.firebaseapp.com",
        projectId: "fir-firebase-acc6b",
        storageBucket: "fir-firebase-acc6b.appspot.com",
        messagingSenderId: "296878360901",
        appId: "1:296878360901:web:7987ce42ec0a406b1f162c"
    };

    firebaseJson = require("./firebase_develop.json");

} else {
    // Heroku
    // DATABASE_URL=${DB}://${POSTGRES_USER}:${POSTGRES_PASSWORD}
    //              @${DB_CONTAINER_NAME}:${DB_PORT}/${POSTGRES_DB}
    databaseUrl = process.env.DATABASE_URL;

    // ONLY use it on migrations (they may change)
    DB_USER = databaseUrl.split("@")[0]
        .split("://")[0]
        .split(":")[0];

    DB_PASSWORD = databaseUrl.split("@")[0]
        .split("://")[0]
        .split(":")[1];

    DB_HOST = databaseUrl.split("@")[1]
        .split(":")[0];

    DB_PORT = databaseUrl.split("@")[1]
        .split(":")[1]
        .split("/")[0];

    POSTGRES_DB = databaseUrl.split("@")[1]
        .split(":")[1]
        .split("/")[1];

    firebaseConfig = {
        apiKey: "AIzaSyCnDa9J7DKKtNv5crxZ4NrRGcW5c7nZTAg",
        authDomain: "fir-firebase-2-9eb22.firebaseapp.com",
        projectId: "fir-firebase-2-9eb22",
        storageBucket: "fir-firebase-2-9eb22.appspot.com",
        messagingSenderId: "701624425016",
        appId: "1:701624425016:web:6cb2157c5a2c0a34e1a4cd"
    };

    firebaseJson = require("./firebase_production.json");

}

module.exports = {
    DB_USER,
    DB_PASSWORD,
    DB_HOST,
    DB_PORT,
    POSTGRES_DB,
    DB_DIALECT,
    SHA_LEN,
    USERS_HOST,
    JSON_HEADER,
    nodePort: process.env.PORT,
    databaseUrl,
    BACKOFFICE_HOST,
    MAX_STR_LEN,
    FIREBASE_MAX_LEN,
    BCRYPT_LEN,
    MIN_STR_LEN,
    MIN_PASS_LEN,
    DATE_FORMAT,
    TIMEZONE,
    SYMBOL_MAX_LEN,
    TIMESTAMP_MAX_LEN,
    RESET_DATABASE,
    isDevelopment,
    LOG_LEVEL,
    AUTH_FRONT,
    firebaseConfig,
    SONG_URL
}
