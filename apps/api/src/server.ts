import { json, urlencoded } from "body-parser";
import express, { Handler } from "express";
import morgan from "morgan";
import cors from "cors";
import { z } from "zod";
import { getUserhandler } from "./users";

// -----

const userSchema = z.object({
  name: z.string(),
});

export const createServer = () => {
  const app = express();
  app
    .use(morgan("dev"))
    .use(urlencoded({ extended: true }))
    .use(json())
    .use(cors())
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
