import express from "express";
import { LogInfo } from "./logger";
import path from "path";
import config from "./config";
import client from "prom-client";
import { apiProxy } from "./proxy";

const PORT = process.env.PORT || 3000;
const BUILD_PATH = path.join(__dirname, "../dist");
const server = express();

const startServer = () => {
  // Create a Registry which registers the metrics
  const register = new client.Registry();
  // Add a default label which is added to all metrics
  register.setDefaultLabels({
    app: "aap-vaktmester",
  }); // Enable the collection of default metrics
  client.collectDefaultMetrics({ register });

  server.use(express.static(BUILD_PATH));
  server.use(express.json());

  // health checks
  server.get([`${config.BASE_PATH}/internal/isAlive`, `${config.BASE_PATH}/internal/isReady`], (req: any, res: any) =>
    res.sendStatus(200)
  );

  server.get(`${config.BASE_PATH}/internal/metrics`, async (req: any, res: any) => {
    res.setHeader("Content-Type", register.contentType);
    res.end(await register.metrics());
  });

  // proxy requests
  apiProxy(config.DEVTOOLS_API_URL, `${config.BASE_PATH}/api`, server);

  // Render app
  server.get(`${config.BASE_PATH}/*`, (req: any, res: any) => res.sendFile(path.join(BUILD_PATH, "index.html")));

  server.listen(PORT, () => {
    LogInfo(`Server started: listening on port ${PORT}`);
  });
};

startServer();
