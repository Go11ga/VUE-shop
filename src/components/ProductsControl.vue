<template>
    <div>
        <div class="mt-1">
            <button type="button"
                    class="btn btn-warning"
                    @click="decreaseInCart(id)"
                    >
                -
            </button>
            <b class="ml-1 mr-1">{{ cntInCartById(id) }}</b>
            <button type="button"
                    class="btn btn-success"
                    @click="increaseInCart(id)"
                    >
                +
            </button>
        </div>
    </div>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex';

    export default {
        props: ['id'],
        computed: {
            ...mapGetters('cart', ['cntInCartById']),
        },
        methods: {
            ...mapActions('cart', { increaseInCart: 'increase', decreaseInCart: 'decrease'}),
        }
    }

</script>

<style>

</style>
