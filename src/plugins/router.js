import Vue from 'vue';
import VueRouter from 'vue-router';
import Games from '../components/Games';
import GameInfo from '../components/GameInfo';

Vue.use(VueRouter);

export default new VueRouter({
    routes: [
        { path: '/', name: 'games', component: Games },
        { path: '/game/:id', name: 'game', component: GameInfo, props: true }
    ],
    base: '/',
    mode: 'history'
});