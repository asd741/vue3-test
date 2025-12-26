export function h(type, props, children) {
  return createVNode(type, props, children);
}

export function createVNode(type, props, children) {
  return {
    type,
    props,
    children,
  };
}

export function ref(value) {
  return {
    value,
  };
}