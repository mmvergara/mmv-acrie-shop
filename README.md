# MMV Acrie Shop

- Release Date: November 18, 2022
- https://mmv-acrie-shop.vercel.app/

Acrie Shop:
Simulating a E-commerce website to practice React w/TS, NodeJS w/TS, jsPDF, Image APIS"s,
Tailwind CSS, Framer Motion and most importantly PostgreSQL, without using any ORM like Sequalize.
It features self-made models for the database queries.

- React FrontEnd
  - Hosted in vercel
  - Live https://mmv-acrie-shop.vercel.app/
- NodeJs
  - Hosted in render.com
- Database
  - Hosted in railway.app (at every 20th+ of the month the server might be down)
- Docs
  - https://mmv-docs.vercel.app/

# Installation

## Client

- Goto `./src/Config.tsx` and change the `API_URL`
- npm install
- npm run dev (dev)
- npm build (build)

## Server

- Fill out `.ENV` file

```javascript
localhost
PGUSER=
PGDATABASE=
PGPASSWORD=
PGPORT=
SECRET_EXPESS_SESSION_KEY=
PORT=
```
