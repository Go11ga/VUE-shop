import server from '@/server';

export default {
    namespaced: true,
    state: {
        items: []
    },
    getters: {
        // получение товаров
        items(state){
            return state.items;
        },
        // карта товаров для ускорения поиска. -> { "100": 0, "101": 1, "103": 2, "105": 3 }
        itemsMap(state){
            let map = {};

            state.items.forEach((item, i) => {
                map[item.id.toString()] = i;
            });

            return map;
        },
        // товар по id
        one(state, getters){
            return function(id){
                let ind = getters.itemsMap[id];

                return state.items[ind];
            }
        }
    },
    mutations: {
        // загрузка товаров в массив
        set(state, products){
            state.items = products;
        }
    },
    actions: {
        // получение списка товаров с сервера
        load(store){
            return new Promise((resolve, reject) => {
                server.get('products/all.php')
                      .then(response => {
                        store.commit('set', response.data);
                        resolve();
                });
            });
        }
    }
}





