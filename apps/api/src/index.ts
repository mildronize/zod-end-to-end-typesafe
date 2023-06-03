import { createServer } from "./server";

const port = process.env.PORT || 3001;
const server = createServer();

import type { Type } from "ui";
const type: Type = "todo";
console.log(type);

server.listen(port, () => {
  console.log(`api running on http://localhost:${port}/`);
});
