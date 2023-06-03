import "./style.css";
import typescriptLogo from "./typescript.svg";
import { Header, Counter, setupCounter } from "ui";

import type { Server, HandlerSchema } from "api";

async function getData<T extends HandlerSchema<any, any>>(method: string,url: string, requestOption: T['request']): Promise<T['response']> {
  const data = await fetch(url, {
    method,
    body: JSON.stringify(requestOption.body), 
  });
  return data.json();
}

async function main(){
  const data = await getData<Server.GetUser>('POST', '/api/users', {
    body: {
      id: '1',
    },
    query: {
      pageId: 1,
    },
    param: {
      name: '1',
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
