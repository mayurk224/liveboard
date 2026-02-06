import express from "express";
import { matchRouter } from "./routes/matches.js";
import http from "http";
import { attachWebSocketServer } from "./ws/server.js";
import { securityMiddleware } from "./arcjet.js";

const app = express();
const server = http.createServer(app);

app.use(express.json());
app.use(securityMiddleware());

const PORT = Number(process.env.PORT) || 8080;
const HOST = process.env.HOST || "0.0.0.0";

app.get("/", (req, res) => {
  res.json({ message: "Hello from Express!" });
});

app.use("/matches", matchRouter);

const { broadcastMatchCreated } = attachWebSocketServer(server);

app.locals.broadcastMatchCreated = broadcastMatchCreated;

server.listen(PORT, HOST, () => {
  const baseUrl = HOST === "0.0.0.0" ? `localhost:${PORT}` : `${HOST}:${PORT}`;
  console.log(`Server running at http://${baseUrl}`);
  console.log(
    `WebSocket server running at ws://${baseUrl.replace("http", "ws")}/ws`,
  );
});
