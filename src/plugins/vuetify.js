import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        themes: {
            light: {
                primary: '#fff',
                secondary: '#f8f8f8',
                accent: '#00c58e',
                error: '#f66',
                info: '#73abfe'
            }
        }
    }
});
