<template>
    <div>
        <h1>Cart</h1>
        <hr>
        <table class="table table-bordered">
            <thead>
                <tr>
                    <th>Title</th>
                    <th>Price</th>
                    <th>Cnt</th>
                    <th>Total</th>
                    <th>Change</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="product in products" :key="product.id">
                    <td>{{ product.title }}</td>
                    <td>{{ product.price }}</td>
                    <td>{{ product.cnt }}</td>
                    <td>{{ product.price * product.cnt }}</td>
                    <td>
                        <button type="button"
                                class="btn btn-warning ml-1"
                                @click="decreaseInCart(product.id)"
                                >
                            -
                        </button>
                        <button type="button"
                                class="btn btn-success ml-1"
                                @click="increaseInCart(product.id)"
                                >
                            +
                        </button>
                        <button type="button"
                                class="btn btn-danger ml-1"
                                @click="removeFromCart({ id:product.id })"
                                >
                            X
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex';

    export default {
        computed: {
            ...mapGetters('cart', { products: 'productsDetailed'})
        },
        methods: {
            ...mapActions('cart', { increaseInCart: 'increase', decreaseInCart: 'decrease', removeFromCart: 'remove'})
        }
    }
</script>
