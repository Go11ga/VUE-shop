import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

import products from './products';
import cart from './cart';

export default new Vuex.Store({
	modules: {
		products,
		cart
	},
	strict: process.env.NODE_ENV !== 'production'
});