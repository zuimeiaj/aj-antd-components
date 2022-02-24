import DebounceInput from "./debounce-input/src/debounce-input.vue";
import LoadingButton from "./loading-button/src/loading-button.vue";

export default {
  install: (Vue) => {
    Vue.component(LoadingButton.name, LoadingButton);
    Vue.component(DebounceInput.name, DebounceInput);
  },
  DebounceInput,
  LoadingButton,
};
