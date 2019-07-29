import Vue from 'vue';
import singleSpaVue from 'single-spa-vue';
import App from './App.vue'

const vueLifecycles = singleSpaVue({
  Vue,
  appOptions: {
    el: '#vue',
    render: r => r(App)
  }
});

export const bootstrap = [
  vueLifecycles.bootstrap,
];

export function mount(props) {
  createDomElement();
  return vueLifecycles.mount(props);
}

export const unmount = [
  vueLifecycles.unmount,
];

function createDomElement() {
  // Make sure there is a div for us to render into
  let el = document.getElementById('app3');

  if (!el) {
      el = document.createElement('div');
      el.id = 'app3';
      document.body.appendChild(el);
  }
  return el;
}