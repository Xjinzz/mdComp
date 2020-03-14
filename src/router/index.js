import Vue from 'vue';
import Router from 'vue-router';

const home = r=>require.ensure([],()=>r(require("../pages/home/home.vue")));
Vue.use(Router);

const routers = [
    {
        path: '/',
        name: 'home',
        component: home
    }
];

const _router = new Router({
    routes: routers
});

export default _router;
