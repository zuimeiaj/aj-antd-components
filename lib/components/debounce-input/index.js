import DebounceInput from "./src/debounce-input.vue";

export default {
  install: (Vue) => {
    Vue.component(DebounceInput.name, DebounceInput);
  },
};
