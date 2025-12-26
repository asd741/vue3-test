import { activeEffect } from "./effect.js";
import { track, trigger } from "./dep.js";

class BaseReactiveHandler {
  get(target, key, receiver) {
    if (activeEffect) track(target, key);
    return Reflect.get(target, key, receiver);
  }
  set(target, key, receiver) {
    target[key] = value;
    trigger(target, key);
    return Reflect.set(target, key, value, receiver);
  }
}

export const baseReactiveHandler = new BaseReactiveHandler();