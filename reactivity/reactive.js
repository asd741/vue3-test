import { baseReactiveHandler } from "./baseHandlers.js";
export function reactive(target) {
  return new Proxy(target, baseReactiveHandler);
}
