import { Pool, Client } from "pg";
import dotenv from 'dotenv'
dotenv.config()

if(!process.env.PGUSER) throw new Error('ENV  is undefined')
if(!process.env.PGHOST) throw new Error('ENV  is undefined')
if(!process.env.PGDATABASE) throw new Error('ENV  is undefined')
if(!process.env.PGPASSWORD) throw new Error('ENV  is undefined')
if(!process.env.PGPORT) throw new Error('ENV  is undefined')

export const postgrePool = new Pool({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: Number(process.env.PGPORT),
});

postgrePool.on("error", (err, client) => {
  console.error("Unexpected error on idle client=====================", err);
  process.exit(-1);
});

// postgrePool
//   .query("SELECT * FROM film")
//   .then((res) => console.log("user:", res.rows))
//   .catch((err) =>
//     setImmediate(() => {
//       throw err;
//     })
//   );
