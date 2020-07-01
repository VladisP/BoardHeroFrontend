import Vue from 'vue';
import VueRouter from 'vue-router';
import Games from '../components/Games';
import GameInfo from '../components/GameInfo';
import Profile from '../components/Profile';
import LoginForm from '../components/LoginForm';
import ReviewForm from '../components/ReviewForm';

Vue.use(VueRouter);

export default new VueRouter({
    routes: [
        { path: '/', name: 'games', component: Games },
        { path: '/game/:id', name: 'game', component: GameInfo, props: true },
        { path: '/profile', name: 'profile', component: Profile },
        { path: '/login', name: 'login', component: LoginForm },
        { path: '/review-form', name: 'review-form', component: ReviewForm, props: true }
    ],
    base: '/',
    mode: 'history'
});