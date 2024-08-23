import mongoose from "mongoose";

const connectString = `mongodb+srv://lamtienhung0412:GzobfYkp4hXUyqb2@cluster0.j93px.mongodb.net/`;

class Database {
  constructor() {
    this.connect();
  }s

  connect() {
    if (1 === 1) {
      mongoose.set("debug", true);
      mongoose.set("debug", { color: true });
    }
    mongoose
      .connect(connectString)
      .then((_) => console.log("Connected to mongodb"))
      .catch((err) => console.log("Error Connected! " + err));
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
