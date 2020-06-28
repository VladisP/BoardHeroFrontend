import Vue from 'vue';
import VueRouter from 'vue-router';
import Games from '../components/Games';

Vue.use(VueRouter);

export default new VueRouter({
    routes: [
        { path: '/', name: 'games', component: Games },
    ],
    base: '/',
    mode: 'history'
});