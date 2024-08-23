//  lv 0
// const config = {
//   app: {
//     port: 4442,
//   },
//   db: {
//     host: "localhost",
//     port: 27017,
//     name: "db",
//   },
// };

// lv 1
import dotenv from "dotenv";
dotenv.config();

const dev = {
  name: "dev",
  app: {
    port: process.env.DEV_APP_PORT,
  },
  db: {
    username: process.env.DEV_DB_USERNAME,
    password: process.env.DEV_DB_PASSWORD,
    cluster: process.env.DEV_DB_CLUSTER,
  },
};
const pro = {
  name: "pro",
  app: {
    port: process.env.PRO_APP_PORT,
  },
  db: {
    username: process.env.PRO_DB_USERNAME,
    password: process.env.PRO_DB_PASSWORD,
    cluster: process.env.PRO_DB_CLUSTER,
  },
};
const config = { dev, pro };
const env = process.env.NODE_ENV || "dev";
export default config[env];
