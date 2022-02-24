import LoadingButton from "./src/loading-button.vue";

export default {
  install: (Vue) => {
    Vue.component(LoadingButton.name, LoadingButton);
  },
};
