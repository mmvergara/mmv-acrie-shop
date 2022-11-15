import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import cookieParser from "cookie-parser";
import expressSession from "express-session";
import { postgrePool } from "./db/postgre";
import pg_simple from "connect-pg-simple";

const app = express();

app.use(cors({ origin: true, credentials: true }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

// Session
if (!process.env.SECRET_KEY_EXPESS_SESSION)
  throw new Error("ENV SECRET_KEY_EXPESS_SESSION is undefined");
const pgSession = pg_simple(expressSession);
const pgSessionStore = new pgSession({
  pool: postgrePool,
  tableName: "user_sessions",
  createTableIfMissing: true,
});
app.use(
  expressSession({
    name: "acrie-shop-session-store",
    secret: process.env.SECRET_KEY_EXPESS_SESSION,
    cookie: { maxAge: 1200000, httpOnly: true, secure: true, sameSite: "none" },
    resave: false,
    saveUninitialized: false,
    store: pgSessionStore,
  })
);
// Session
