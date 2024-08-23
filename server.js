import app from "./src/app.js";

const PORT = 4442;

const server = app.listen(4442, () => {
  console.log(`Server is running on port ${PORT}`);
});

process.on("SIGINT", () => {
  server.close(() => console.log("Exit Server Express"));
});
