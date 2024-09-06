import app from "./src/app.js";
import config from "./src/configs/config.mongodb.js";
const { app: { port } } = config;
const PORT = port || 4443;

const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

