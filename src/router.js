import Vue from './prototype';
import VueRouter from 'vue-router'
import Home from './_pages/Home/Home'
import Login from './_pages/Login/Login'
let routes = [
    /** Auth needed (add meta.protected = true) */
    {
        path: '/home',
        name: 'Home',
        component: Home,
        meta: {
            protected: true,
            title: 'Início'
        }
    },

    /** Auth not needed (add meta.protected = false) */
    {
        path: '/entrar',
        name: 'Realizar Login',
        component: Login,
        meta: {
            protected: false,
            title: 'Realizar Login'
        }
    },
    {
        path: '*',
        component: Home,
        name: 'Other',
        meta: {
            title: 'Login'
        }
    }
]

Vue.use(VueRouter);

var router = new VueRouter({
    routes,
    mode: 'history'
});

export default router;