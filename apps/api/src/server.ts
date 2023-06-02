import { json, urlencoded } from "body-parser";
import express from "express";
import morgan from "morgan";
import cors from "cors";
import { z } from "zod";

const userSchema = z.object({
  name: z.string(),
});

type User = z.infer<typeof userSchema>;

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
    .post("/user", (req, res) => { 
     
      const data = userSchema.safeParse(req.body);     
      if(!data.success) {
        return res.status(400).json({message: data.error});
      }
      return res.json({message: `user ${data.data.name} created`});
    })
    .get("/healthz", (req, res) => {
      return res.json({ ok: true });
    });

  return app;
};
