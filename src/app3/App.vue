<template>
  <div>
    
  </div>
</template>

<script>
import Vue from 'vue';
import router from './router'; 
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

export default {
    mounted() {
      new Vue({
        el:'#app3', 
        router,
        template: `<div id="app3">
                <router-view/>
            </div>`
      })
    },
}
</script>>