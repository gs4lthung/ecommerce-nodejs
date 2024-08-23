import app from "./src/app.js";
import config from "./src/configs/config.mongodb.js";
const { app: { port } } = config;
const PORT = port || 4443;

const server = app.listen(4442, () => {
  console.log(`Server is running on port ${PORT}`);
});

process.on("SIGINT", () => {
  server.close(() => console.log("Exit Server Express"));
});
