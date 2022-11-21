import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import cookieParser from "cookie-parser";
import expressSession from "express-session";
import pg_simple from "connect-pg-simple";
//Middlewares
import ErrorHandling from "./middleware/ErrorHandling";

// Routes imports
import authRoutes from "./routes/authRoutes";
import productRoutes from "./routes/productRoutes";
import cartProductRoutes from "./routes/cartProductRoutes";

//Postgre init
import { postgrePool } from "./db/postgre";
import { EXPESS_SESSION_KEY, PORT } from "./config";
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

app.set("trust proxy", 1);
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

// ROUTES
app.use("/auth", authRoutes);
app.use("/product", productRoutes);
app.use("/cartproduct", cartProductRoutes);
// @ts-ignore
app.get("/", (req, res, next) => res.send("hello world"));
// ROUTES

//ERROR HANDLING
app.use(ErrorHandling);
//ERROR HANDLING

const port = PORT || 3000;
app.listen(PORT || 3000, () => {
  console.log(`Listening to port ${port}`);
});
