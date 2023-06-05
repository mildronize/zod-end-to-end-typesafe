import "./style.css";
import typescriptLogo from "./typescript.svg";
import { Header, Counter, setupCounter } from "ui";

import type { AppRouter, HandlerSchema, HandlerSchema2, RequestSchema } from "api";

async function getData<T extends HandlerSchema2>(method: T['method'], url: T['path'], requestOption: T['request']): Promise<T['response']> {
  const body = requestOption.body ? JSON.stringify(requestOption.body) : undefined;
  const data = await fetch(url, {
    method,
    body
  });
  return data.json();
}

async function main() {
  const data = await getData<AppRouter.GetUser>('post', '/users/:name', {
    body: {
      id: '1',
    },
    query: {
      pageId: 1,
    },
    param: {
      name: '1'
    },
  });
  console.log(data);
}

main();


document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://www.typescriptlang.org/" target="_blank">
      <img src="${typescriptLogo}" class="logo vanilla" alt="TypeScript logo" />
    </a>
    ${Header({ title: "Web" })}
    <div class="card">
      ${Counter()}
    </div>
  </div>
`;

setupCounter(document.querySelector<HTMLButtonElement>("#counter")!);
