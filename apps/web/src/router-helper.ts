import { AnyRouter } from 'api';

type Headers = {
  headers?: Record<string, string>;
};

export async function getData<T extends AnyRouter>(
  method: T['method'],
  url: T['path'],
  requestOption: T['request'] & Headers
): Promise<T['response']> {
  const body = requestOption.body ? JSON.stringify(requestOption.body) : undefined;
  for (const [param, value] of Object.entries(requestOption.param ?? {})) {
    url = url.replace(`:${param}`, value);
  }
  if (requestOption.query) url = url + '?' + new URLSearchParams(requestOption.query).toString();
  const data = await fetch(url, {
    method,
    body,
    headers: requestOption.headers,
  });
  return data.json();
}
