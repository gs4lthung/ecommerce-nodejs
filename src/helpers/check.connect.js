import mongoose from "mongoose";
import os from "os";
const countConnect = () => {
  const numConnection = mongoose.connections.length;
  console.log("Number of connections: ", numConnection);
};

const _SECONDS = 5 * 1000;
const checkOverload = () => {
  setInterval(() => {
    const numConnection = mongoose.connections.length;
    const numCores = os.cpus().length;
    const memoryUsage = process.memoryUsage().rss;

    //Example: maximum numer of connections based on number of cores is 5
    const maxConnection = numCores * 5;
    console.log("Active connections: ", numConnection);
    console.log("Memory usage: ", memoryUsage / 1024 / 1024, "MB");
    if (numConnection > maxConnection) {
      console.log("Connection overload");
    }
  }, _SECONDS); // monitor every 5 seconds
};

export { countConnect, checkOverload };
