import './style.css';
import typescriptLogo from './typescript.svg';
import { Header, Counter, setupCounter } from 'ui';
import { getData } from './router-helper';
import type { AppRouter } from 'api';

async function main() {
  const responseData = await getData<AppRouter['GetUser']>('post', '/users/:name', {
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
  console.log(responseData.success);
}

main();

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://www.typescriptlang.org/" target="_blank">
      <img src="${typescriptLogo}" class="logo vanilla" alt="TypeScript logo" />
    </a>
    ${Header({ title: 'Web' })}
    <div class="card">
      ${Counter()}
    </div>
  </div>
`;

setupCounter(document.querySelector<HTMLButtonElement>('#counter')!);
