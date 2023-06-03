import type { GetUserType as _GetUserType } from './users';
export type { HandlerSchema } from "./route-utils";

export namespace Server {
  export type GetUser = _GetUserType
}
// export type RequestSchema = {
//   response?: string;
// }