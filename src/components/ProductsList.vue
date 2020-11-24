<template>
    <div>
        <h1>Products</h1>
        <div class="row">
            <div class="col col-sm-4 mb-3 mt-3"
                    v-for="product in products"
                    :key="product.id"
            >
                <div class="card">
                    <div class="card-body">
                        <h3>{{ product.title }}</h3>
                        <div>{{ product.price }}</div>
                        <router-link :to="`/products/${product.id}`">
                            Read more
                        </router-link>
                        <hr>
                        <transition name="move" mode="out-in">
                            <div v-if="inCart(product.id)">
                                <button type="button"
                                        class="btn btn-danger"
                                        @click="removeFromCart({ id: product.id })"
                                        >
                                    Remove
                                </button>
                                <div class="mt-1">
                                    <app-products-control
                                        :id="product.id"
                                    ></app-products-control>
                                </div>
                            </div>
                            <button type="button"
                                    class="btn btn-success"
                                    @click="addToCart({ id: product.id })"
                                    v-else
                                    >
                                Add to cart
                            </button>

                        </transition>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import { mapState, mapGetters, mapActions } from 'vuex';
    import AppProductsControl from '@/components/ProductsControl';

    export default {
        components: {
            AppProductsControl
        },
        computed: {
            ...mapState('cart', { test: 'products' }),
            ...mapGetters('products', { products: 'items' }),
            ...mapGetters('cart', ['inCart'])
        },
        methods: {
            ...mapActions('cart', { addToCart: 'add', removeFromCart: 'remove' }),
        }
    }
</script>

<style>
    .move-enter-active {
        animation: moveIn 0.5s;
    }

    .move-leave-active {
        animation: moveOut 0.5s;
    }

    @keyframes moveIn {
        from { opacity: 0; transform: translateY(50px) }
        to { opacity: 1; transform: translateY(0) }
    }

    @keyframes moveOut {
        from { opacity: 1; transform: translateY(0) }
        to { opacity: 0; transform: translateY(50px) }
    }

</style>
