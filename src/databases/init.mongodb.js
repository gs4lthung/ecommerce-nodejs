import mongoose from "mongoose";
import { countConnect } from "../helpers/check.connect.js";
import config from "../configs/config.mongodb.js";
const {
  name,
  db: { username, password, cluster },
} = config;
const connectString = `mongodb+srv://${username}:${password}@${cluster}`;

class Database {
  constructor() {
    this.connect();
  }

  connect(type = "mongodb") {
    if (1 === 1) {
      mongoose.set("debug", true);
      mongoose.set("debug", { color: true });
    }
    mongoose
      .connect(connectString, { maxPoolSize: 10 })
      .then((_) =>
        console.log(
          `Connected to mongodb at ${name.toUpperCase()} mode`,
          countConnect()
        )
      )
      .catch((err) =>
        console.log(`Error Connected! at ${name.toUpperCase()} mode ` + err)
      );
  }
  static getInstance() {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }
}

const instanceMongoDB = Database.getInstance();
export default instanceMongoDB;
