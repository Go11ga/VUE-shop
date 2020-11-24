import Vue from 'vue';
import App from '@/App.vue';
import store from '@/store';
import router from '@/router';

Vue.config.productionTip = false;

store.dispatch('products/load').then(() => {
    new Vue({
        store,
        router,
        render: h => h(App),
    }).$mount('#app');
});

store.dispatch('cart/load');

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
