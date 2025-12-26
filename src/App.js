import { h, ref } from "./runtime-core/index.js";

const count = ref(12);

const HelloWorld = {
  name: "HelloWorld",
  setup() {},
  render() {
    return h(
      "div",
      { tId: "helloWorld" },
      `hello world: count: ${count.value}`
    );
  },
};

export default {
  name: "App",
  setup() {},

  render() {
    return h("div", { tId: 1 }, [h("p", {}, "主页"), h(HelloWorld)]);
  },
};
