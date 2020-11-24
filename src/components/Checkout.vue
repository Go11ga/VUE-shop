<template>
    <div>
        <h1>Order now</h1>
        <hr>
        <transition name="fade" mode="out-in">
            <div v-if="cartEmpty" class="alert alert-primary">Order has been sent</div>
            <button
                class="btn btn-primary"
                @click="cleanCart"
                v-else
            >
                Send order
            </button>
        </transition>
    </div>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex';

    export default {
        computed: {
            ...mapGetters('cart', ['cnt']),
            cartEmpty(){
                if(this.cnt == 0){
                    return true;
                }
            }
        },
        methods: {
            ...mapActions('cart', ['cleanCart']),
        }
    }
</script>

<style>
    .fade-enter-active {
        animation: fadeIn 0.3s;
    }

    .fade-leave-active {
        animation: fadeOut 0.3s;
    }

    @keyframes fadeIn {
        from { opacity: 0 }
        to { opacity: 1 }
    }

    @keyframes fadeOut {
        from { opacity: 1 }
        to { opacity: 0 }
    }

</style>
