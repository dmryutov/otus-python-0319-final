import NProgress from 'nprogress';
import Vue from 'vue';
import VueRouter from 'vue-router';
import VeeValidate from 'vee-validate';
import Vuetify from 'vuetify';

import App from '@/App.vue';
import VuetifyToast from '@/components/toast';
import Tooltip from '@/components/ui/Tooltip';
import VWidget from '@/components/ui/VWidget';
import router from '@/router/index';
import store from '@/store/index';


// Plugins
NProgress.configure({
    showSpinner: false,
});
Vue.use(VueRouter);
Vue.use(VeeValidate, {
    fieldsBagName: 'veeFields',
});
Vue.use(Vuetify, {
    theme: {
        primary: '#616161', // colors.grey.darken2
        secondary: '#757575', // colors.grey.darken1
        error: '#e53935', // colors.red.darken1
        info: '#7986cb', // colors.indigo.lighten2
        success: '#43a047', // colors.green.darken1
        warning: '#ffa000', // colors.amber.darken2
    },
    customProperties: true,
    iconfont: 'mdi',
});
Vue.use(VuetifyToast);

// Global components
Vue.component('tooltip', Tooltip);
Vue.component('v-widget', VWidget);

// Create app
export const vueApp = new Vue({
    el: '#app',
    router,
    store,
    render: (h) => h(App),
});
window.vueApp = vueApp;
