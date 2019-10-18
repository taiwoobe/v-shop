import shop from '@/api/shop.js';

export default {
    namespaced: true,
    state: {
        items: [],
        checkoutStatus: null
    },
    actions: {
        addProductToCart({ state, commit, getters, rootState, rootGetters}, product) {
            // first we check if product is available
            if (rootGetters['products/productIsInStock'](product)) {
                // next we check if product is already in cart
                const cartItem = state.items.find(item => item.id === product.id);
                if (!cartItem) {
                    commit('pushProductToCart', product.id);
                } else {
                    commit('incrementItemQuantity', cartItem);
                }
                // create a mutation to always reduce product inventory when added to cart
                commit('products/decrementProductInventory', product, {root: true});
            } else {
                // show out of stock message to the user
                console.log('Product is out of stock');
            }
        },
        checkout({ state, commit }) {
            shop.buyProducts(
                state.items,
                () => {
                    commit('emptyCart');
                    commit('setCheckoutStatus', 'success');
                },
                () => {
                    commit('setCheckoutStatus', 'failed');
                }
            )
        }
    },
    getters: {
        cartProducts(state, getters, rootState) {
            return state.items.map(cartItem => {
                const product = rootState.products.items.find(product => product.id === cartItem.id);
                return {
                    title: product.title,
                    price: product.price,
                    quantity: cartItem.quantity
                }
            })
        },
        cartTotal(state, getters) {
            let total = 0;
            getters.cartProducts.forEach(product => {
                total += product.price * product.quantity;
            });
            return total;
            // Using the reduce method for the same result above
            // return getters.cartTotal.reduce((total, product) =>  total + product.price * product.quantity, 0);
        },
    },
    mutations: {
        pushProductToCart(state, productId) {
            state.items.push({
                id: productId,
                quantity: 1
            })
        },
        incrementItemQuantity(state, cartItem) {
            cartItem.quantity++;
        },
        emptyCart(state) {
            state.items = [];
        },
        setCheckoutStatus(state, status) {
            state.checkoutStatus = status;
        }
    }
}