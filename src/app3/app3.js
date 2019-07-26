import Vue from 'vue/dist/vue.min.js';
import singleSpaVue from 'single-spa-vue';
import App3 from "./app3";


const vueLifecycles = singleSpaVue({
  Vue,
  appOptions: {
    el: '#vue-app',
    template: '<App3 />',
    components: {
      App3
    }
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
