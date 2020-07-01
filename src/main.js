import Vue from 'vue';
import App from './App.vue';
import vuetify from './plugins/vuetify';
import router from './plugins/router';
import { buildServices } from './services/serviceBuilder';

Vue.config.productionTip = false;

new Vue({
    vuetify,
    router,
    render: h => h(App, {
        props: {
            services: buildServices()
        }
    })
}).$mount('#app');
