import Vue from 'vue';
import Router from 'vue-router';
Vue.use(Router);

export const constantRouterMap = [
    {
        path:'/404',
        component: () => import('../views/404.vue')
    },
    {
        path:'/cashFlow',
        component: () => import('../views/Table.vue')
    }
]

export default new Router({
    routes: constantRouterMap
})