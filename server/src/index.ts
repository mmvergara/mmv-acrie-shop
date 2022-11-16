import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import cookieParser from "cookie-parser";
import expressSession from "express-session";
import pg_simple from "connect-pg-simple";

import { postgrePool } from "./db/postgre";
import { EXPESS_SESSION_KEY } from "./config";
import table_inits from "./db/tables_init";

const app = express();
app.use(cors({ origin: true, credentials: true }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

// Session
const pgSession = pg_simple(expressSession);
const pgSessionStore = new pgSession({
  pool: postgrePool,
  tableName: "user_sessions",
  createTableIfMissing: true,
});
postgrePool.query(table_inits);
app.use(
  expressSession({
    name: "acrie-shop-session-store",
    secret: EXPESS_SESSION_KEY,
    cookie: { maxAge: 1200000, httpOnly: true, secure: true, sameSite: "none" },
    resave: false,
    saveUninitialized: false,
    store: pgSessionStore,
  })
);
// Session
