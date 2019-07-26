import Vue from 'vue/dist/vue.min.js';
import singleSpaVue from 'single-spa-vue';
import Application from "./Application.vue";



const vueLifecycles = singleSpaVue({
  Vue,
  appOptions: {
    render: h => h(Application),
  }
});

export const bootstrap = [
  vueLifecycles.bootstrap,
];

export const mount = [
  vueLifecycles.mount,
];

export const unmount = [
  vueLifecycles.unmount,
];
