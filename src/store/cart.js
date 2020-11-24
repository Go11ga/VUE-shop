import server from '@/server';

export default {
    namespaced: true,
    state: {
        products: [],
        token: null
    },
    getters: {
        // количество товаров в корзине по типам
        cnt(state){
            return state.products.length;
        },
        // количество товаров в корзине по шт., всего
        cntTotal(state){
            return state.products.reduce((total, pr) => {
                return total + pr.cnt;
            }, 0)
        },
        // получение индекса в массиве по id
        indById(state){
            return function(id){
                return state.products.findIndex(pr => pr.id === id);
            }
        },
        // товар в корзине boolean
        inCart(state, getters){
            return function(id){
                return getters.indById(id) !== -1
            }
        },
        // количество товара в корзине в шт. по id
        cntInCartById(state, getters){
            return function(id){
                if(getters.inCart(id)){
                    return state.products[getters.indById(id)].cnt;
                }
            }
        },
        // объект с полным описанием товара + количество в корзине
        productsDetailed(state, getters, rootState, rootGetters){
            return state.products.map(pr => {
                let info = rootGetters['products/one'](pr.id);
                return { ...info, ...pr };
            });
        },
        // сумма товаров в корзине
        total(state, getters){
            return getters.productsDetailed.reduce((total, pr) => {
                return total + pr.price * pr.cnt;
            }, 0);
        }
    },
    mutations: {
        // загрузка товаров в корзину с сервера и определение токена
        setCart(state, { cart, token }){
            state.products = cart;
            state.token = token;
        },
        // добавить товар
        add(state, { id }){
            state.products.push({ id, cnt:1 });
        },
        // удалить товар
        remove(state, { ind }){
            state.products.splice(ind, 1);
        },
        // изменить количество товара в корзине
        setCnt(state, { ind, newCnt }){
            state.products[ind].cnt = newCnt;
        },
        // очистка корзины
        cleanCart(state, { cnt }){
            state.products.splice(0, cnt);
        }
    },
    actions: {
        // загрузить корзину с сервера
        load(store){
            let currentToken = localStorage.getItem('cartToken');

            server.get(`cart/load.php?token=${currentToken}`)
                  .then(response => {
                    let { cart, token, needUpdate } = response.data;

                    if(needUpdate){
                        currentToken = token;
                        localStorage.setItem('cartToken', currentToken);
                    }

                    store.commit('setCart', { cart, token:  currentToken });
            });
        },
        // добавить товар в корзину на сервере
        add(store, payload){
            if(!store.getters.inCart(payload.id)){
                server.get(`cart/add.php?token=${store.state.token}&id=${payload.id}`)
                      .then(response => {
                        if(response.data){
                            store.commit('add', payload);
                        }
                    });
            }
        },
        // удалить товар из корзины на сервере
        remove(store, { id }){
            if(store.getters.inCart(id)){
                server.get(`cart/remove.php?token=${store.state.token}&id=${id}`)
                      .then(response => {
                        if(response.data){
                            store.commit('remove', { ind: store.getters.indById(id) });
                        }
                    });
            }
        },
        // увеличить количество товара в корзине на сервере
        increase(store, id){
            let ind = store.getters.indById(id);
            let cnt = store.state.products[ind].cnt;
            let newCnt = cnt + 1;
            let currentToken = localStorage.getItem('cartToken');

            if(store.getters.inCart(id)){
                server.get(`cart/change.php?token=${currentToken}&id=${id}&cnt=${newCnt}`)
                      .then(response => {
                        if(response){
                            store.commit('setCnt', { ind, newCnt });
                        }
                    });
            }
        },
        // уменьшить количество товара в корзине на сервере
        decrease(store, id){
            let ind = store.getters.indById(id);
            let cnt = store.state.products[ind].cnt;
            let newCnt = Math.max(1, cnt - 1);
            let currentToken = localStorage.getItem('cartToken');

            if(store.getters.inCart(id)){
                server.get(`cart/change.php?token=${currentToken}&id=${id}&cnt=${newCnt}`)
                      .then(response => {
                        if(response){
                            store.commit('setCnt', { ind, newCnt });
                        }
                    });
            }
        },
        // очистка корзины на сервере
        cleanCart(store){
            let currentToken = localStorage.getItem('cartToken');
            let cnt = store.getters.cnt;

            server.get(`cart/clean.php?token=${currentToken}`)
                  .then(response => {
                    if(response){
                        store.commit('cleanCart', { cnt });
                    }
            });
        }
    }
}











