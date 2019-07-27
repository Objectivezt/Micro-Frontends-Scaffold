import Vue from 'vue';
import singleSpaVue from 'single-spa-vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import Hello from './App.vue'

Vue.use(ElementUI);

const vueLifecycles = singleSpaVue({
  Vue,
  appOptions: {
    el: '#vue',
    render: r => r(Hello)
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