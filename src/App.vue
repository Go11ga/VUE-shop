<template>
    <div>
        <header>
            <div class="container">
                <div class="row">
                    <div class="col col-sm-9">
                        <h1>Site</h1>
                    </div>
                    <div class="col col-sm-3">
                        <div class="alert alert-default">
                            <div>In Cart: {{ cartCntTotal }}</div>
                            <div>Cart total: {{ cartTotal }}</div>
                        </div>
                    </div>
                </div>
                <hr>
            </div>
        </header>
        <section>
            <div class="container">
                <div class="row">
                    <div class="col col-sm-3 menu">
                        <ul class="list-group">
                            <router-link v-for="item in leftMenu"
                                             :key="item.path"
                                             :to="item.path"
                                             class="list-group-item"
                                             active-class="active"
                                             exact
                            >
                                <a>{{ item.title }}</a>
                            </router-link>
                        </ul>
                    </div>
                    <div class="col col-sm-9">
                        <transition name="rotate" mode="out-in">
                            <router-view></router-view>
                        </transition>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex';

    export default {
        data(){
            return {
                leftMenu: [
                    { path: '/products', title: 'Products' },
                    { path: '/cart', title: 'Cart' },
                    { path: '/order', title: 'Checkout' }
                ]
            }
        },
        computed: {
            ...mapGetters('cart', { cartCnt: 'cnt', cartTotal: 'total', cartCntTotal: 'cntTotal' })
        }
    }

</script>

<style>
    .menu{
        border-right: 1px solid #ddd;
    }

    .list-group-item{
        transition: background 0.3s, color 0.3s;
    }

    .rotate-enter-active {
        animation: rotateIn 0.3s;
    }

    .rotate-leave-active {
        animation: rotateOut 0.3s;
    }

    @keyframes rotateIn {
        from { transform: rotateY(90deg)}
        to { transform: rotateY(0) }
    }

    @keyframes rotateOut {
        from { transform: rotateY(0) }
        to { transform: rotateY(90deg) }
    }

</style>
