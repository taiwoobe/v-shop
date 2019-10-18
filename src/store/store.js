import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'

Vue.use(Vuex)

export default new Vuex.Store({
  state: { // = data
    products: [],
    cart: [],
    checkoutStatus: null
  },
  actions,
  getters: { // = computed properties
    availableProducts(state, getters) {
      return state.products.filter(products => products.inventory > 0);
    },
    cartProducts(state) {
      return state.cart.map(cartItem => {
        const product = state.products.find(product => product.id === cartItem.id);
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
    productIsInStock() {
      return (product) => {
        return product.inventory > 0;
      }
    }
  },
  mutations: { // = setting & updating the state
    setProducts(state, products) {
      state.products = products;
    },
    pushProductToCart(state, productId) {
      state.cart.push({
        id: productId,
        quantity: 1
      })
    },
    incrementItemQuantity(state, cartItem) {
      cartItem.quantity++;
    },
    decrementProductInventory(state, product) {
      product.inventory--;
    },
    emptyCart(state) {
      state.cart = [];
    },
    setCheckoutStatus(state, status) {
      state.checkoutStatus = status;
    }
  }
})
