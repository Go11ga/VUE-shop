<template>
    <div v-if="hasProduct">
        <h1>{{ product.title }}</h1>
        <router-link
           to="/products"
           >
            Back to products
        </router-link>
        <hr>
        <div class="alert alert-success">
            price: {{ product.price }}
        </div>
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

    <app-404 v-else></app-404>

</template>

<script>
    import App404 from '@/components/E404';
    import AppProductsControl from '@/components/ProductsControl';

    import { mapGetters, mapActions } from 'vuex';

    export default {
        components: {
            App404,
            AppProductsControl
        },
        computed: {
            ...mapGetters('products', ['one']),
            ...mapGetters('cart', ['inCart']),
            id(){
                return this.$route.params.id;
            },
            product(){
                return this.one(this.id);
            },
            hasProduct(){
                return this.product !== undefined;
            }
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


















