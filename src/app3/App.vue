<template>
  <div>
  </div>
</template>

<script>
import Vue from 'vue';
import router from './router'; 
import Temp from './Temp.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

export default {
    mounted() {
      new Vue({
        el:'#vue', 
        router,
        render: r => r(Temp)
      })
    },
}
</script>>