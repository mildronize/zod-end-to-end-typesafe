import { json, urlencoded } from "body-parser";
import express, { Handler } from "express";
import morgan from "morgan";
import cors from "cors";
import { z } from "zod";
import { getUserhandler } from "./users";

export const createServer = () => {
  const app = express();
  app
    .use(morgan("dev"))
    .use(urlencoded({ extended: true }))
    .use(json())
    .use(cors())
    .get("/", (req, res) => {
      return res.json({ message: "hello world" });
    })
    // .use(errorResponder)
    .get("/message/:name", (req, res) => {
      return res.json({ message: `hello ${req.params.name}` });
    })
    .post("/user", getUserhandler)
    .get("/healthz", (req, res) => {
      return res.json({ ok: true });
    });

  return app;
};

const port = process.env.PORT || 3001;
const server = createServer();

server.listen(port, () => {
  console.log(`api running on http://localhost:${port}/`);
});
