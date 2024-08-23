import mongoose from "mongoose";

const connectString = `mongodb+srv://lamtienhung0412:GzobfYkp4hXUyqb2@cluster0.j93px.mongodb.net/`;
const mongooseConnection = mongoose
  .connect(connectString)
  .then((_) => console.log("Connected to mongodb"))
  .catch((err) => console.log("Error Connected! " + err));

//dev
if (1 === 0) {
  mongoose.set("debug", true);
  mongoose.set("debug", { color: true });
}

export default mongooseConnection;
