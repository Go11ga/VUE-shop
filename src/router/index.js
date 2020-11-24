import Vue from 'vue';
import VueRouter from 'vue-router';

import ProductsList from '@/components/ProductsList';
import Product from '@/components/Product';
import Cart from '@/components/Cart';
import Checkout from '@/components/Checkout';
import E404 from '@/components/E404';

Vue.use(VueRouter);

let routes = [
	{
		path: '/',
		redirect: '/products'
	},
	{
		path: '/products',
		component: ProductsList
	},
	{
		path: '/products/:id',
		component: Product
	},
	{
		path: '/cart',
		component: Cart
	},
	{
		path: '/order',
		component: Checkout
	},
	{
		path: '**',
		component: E404
	}
];

export default new VueRouter({
	routes,
	mode: 'history'
});