import shop from '@/api/shop.js';

export default {
    namespaced: true,
    state: {
        items: []
    },
    actions: {
        fetchProducts({ commit }) {
            return new Promise((resolve, reject) => {
                shop.getProducts(products => {
                    commit('setProducts', products);
                    resolve();
                })
            })
        }
    },
    getters: {
        availableProducts(state, getters) {
            return state.items.filter(products => products.inventory > 0);
        },
        productIsInStock() {
            return (product) => {
                return product.inventory > 0;
            }
        }
    },
    mutations: {
        setProducts(state, products) {
            state.items = products;
        },
        decrementProductInventory(state, product) {
            product.inventory--;
        }
    }
}