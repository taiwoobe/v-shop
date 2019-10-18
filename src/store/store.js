import Vue from 'vue'
import Vuex from 'vuex'
import shop from '@/api/shop.js';

Vue.use(Vuex)

export default new Vuex.Store({
  state: { // = data
    products: [],
    cart: []
  },
  actions: { // = methods
    fetchProdcts({commit}) {
      return new Promise((resolve, reject) => {
        shop.getProducts(products => {
          commit('setProducts', products);
          resolve();
        })
      })
    },
    addProductToCart(context, product) {
      // first we check if product is available
      if (product.inventory > 0) {
        // next we check if product is already in cart
        let cartItem = context.state.cart.find(item => item.id === product.id);
        if (!cartItem) {
          context.commit('pushProductToCart', product.id);
          console.log(cartItem)
        } else {
          context.commit('incrementItemQuantity', cartItem);
          console.log(cartItem)
        }
        // create a mutation to always reduce product inventory when added to cart
        context.commit('decrementProductInventory', product);
      } else {
        // show out of stock message to the user
        console.log('Product is out of stock');
      }
    }
  },
  getters: { // = computed properties
    availableProducts(state, getters) {
      return state.products.filter(products => products.inventory > 0);
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
    }
  }
})
