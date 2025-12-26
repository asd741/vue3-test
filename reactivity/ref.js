import { baseHandlers } from "./baseHandlers";
export function ref(target) {
  return new Proxy(target, baseHandlers);
}
