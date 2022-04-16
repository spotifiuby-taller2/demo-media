require('dotenv').config({
  path: `.env${process.env.MY_ENV}`
});

const MAX_STR_LEN = 254;
const FIREBASE_MAX_LEN = 36;
const MAX_STR_FIREBASE_LINK = 1000;

const DATE_FORMAT = "YYYY-M-D H:mm:ss.SS";
const TIMEZONE = "America/Buenos_Aires";

const LOG_LEVEL = process.env.LOG_LEVEL;

const RESET_DATABASE = false;

/* Frontend hosts */
const BACKOFFICE_HOST = process.env.BACKOFFICE_HOST;
const AUTH_FRONT = process.env.AUTH_FRONT;
const USERS_HOST = process.env.USERS_HOST;


/* Backends paths */
const SONG_URL = "/songs"
const ALBUM_URL = "/albums"

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
}

module.exports = {
  DB_USER,
  DB_PASSWORD,
  DB_HOST,
  DB_PORT,
  POSTGRES_DB,
  DB_DIALECT,
  USERS_HOST,
  NODE_PORT: process.env.PORT,
  DATABASE_URL: databaseUrl,
  BACKOFFICE_HOST,
  MAX_STR_LEN,
  FIREBASE_MAX_LEN,
  DATE_FORMAT,
  TIMEZONE,
  MAX_STR_FIREBASE_LINK,
  RESET_DATABASE,
  isDevelopment,
  LOG_LEVEL,
  AUTH_FRONT,
  SONG_URL,
  ALBUM_URL
}
