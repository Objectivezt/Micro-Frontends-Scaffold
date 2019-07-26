import Vue from 'vue';
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes  = [
    {
        path:'/child1',
        components:() => require('./page.vue'),
    }
]
let router = new VueRouter({
    routes
})

export default router;