import { activeEffect } from "./effect";
import { targetMap } from "./dep";

export function reactive(target) {
  return new Proxy(target, {
    get(target, key) {
      if (activeEffect) {
        let depsMap = targetMap.get(target);
        if (!depsMap) {
          depsMap = new Map();
          targetMap.set(target, depsMap);
        }
        let dep = depsMap.get(key);
        if (!dep) {
          dep = new Set();
          depsMap.set(key, dep);
        }
        dep.add(activeEffect);
      }
      return target[key];
    },
    set(target, key, value) {
      target[key] = value;
      const depsMap = targetMap.get(target);
      if (depsMap) {
        const dep = depsMap.get(key);
        if (dep) {
          dep.forEach(effect => effect.run());
        }
      }
      return true;
    },
  });
}
