import express from "express";
import { matchRouter } from "./routes/matches.js";
const app = express();

app.use(express.json());

const port = 8080;

app.get("/", (req, res) => {
  res.json({ message: "Hello from Express!" });
});

app.use("/matches", matchRouter);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
