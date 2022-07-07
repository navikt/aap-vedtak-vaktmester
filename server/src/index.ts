import express from "express";
import {LogInfo} from "./logger";
import path from "path";
import config from "./config";

const PORT = process.env.PORT || 3000;
const BUILD_PATH = path.join(__dirname, "../dist");
const server = express();

const startServer = () => {
  // Render app
  server.get(`${config.BASE_PATH}/*`, (req: any, res: any) =>
    res.sendFile(path.join(BUILD_PATH, "index.html"))
  );

  server.listen(PORT, () => {
    LogInfo(`Server started: listening on port ${PORT}`);
  });
};

startServer();
