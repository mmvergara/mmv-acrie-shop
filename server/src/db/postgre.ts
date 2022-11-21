import { Pool } from "pg";
import { pgPoolSettings } from "../config";

export const postgrePool = new Pool({...pgPoolSettings});
postgrePool.on("error", (err, client) => {
  console.error("Unexpected error on idle client=====================", err);
  process.exit(-1);
});
