import Vue from 'vue';
import Router from 'vue-router';
Vue.use(Router);

export const constantRouterMap = [
    {
        path:'/404',
        component: () => import('./404.vue')
    }
]

export default new Router({
    routes: constantRouterMap
})