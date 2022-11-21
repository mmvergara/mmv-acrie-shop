import dotenv from "dotenv";
dotenv.config();

if (!process.env.PGUSER) throw new Error("ENV PGUSER is undefined");
if (!process.env.PGHOST) throw new Error("ENV PGHOST is undefined");
if (!process.env.PGDATABASE) throw new Error("ENV PGDATABASE is undefined");
if (!process.env.PGPASSWORD) throw new Error("ENV PGPASSWORD is undefined");
if (!process.env.PGPORT) throw new Error("ENV PGPORT is undefined");

export const pgPoolSettings = {
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: Number(process.env.PGPORT),
};

if (!process.env.SECRET_EXPESS_SESSION_KEY)
  throw new Error("ENV SECRET_KEY_EXPESS_SESSION is undefined");

export const EXPESS_SESSION_KEY = process.env.SECRET_EXPESS_SESSION_KEY;

export const PORT = process.env.PORT || 3000
