import { activeEffect } from "./effect";
import { targetMap, track, trigger } from "./dep";

export function reactive(target) {
  return new Proxy(target, {
    get(target, key) {
      if (activeEffect) {
        track(target, key);
      }
      return target[key];
    },
    set(target, key, value) {
      target[key] = value;
      trigger(target, key);
      return true;
    },
  });
}
