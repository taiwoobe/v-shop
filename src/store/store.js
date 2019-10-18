import Vue from 'vue'
import Vuex from 'vuex'
import shop from '@/api/shop.js';

Vue.use(Vuex)

export default new Vuex.Store({
  state: { // = data
    products: []
  },
  mutations: { // = setting & updating the state
    setProducts(state, products) {
      state.products = products;
    }
  },
  getters: { // = computed properties
    productsCount() {
    },
    availableProducts(state, getters) {
      return state.products.filter(products => products.inventory > 0);
    }
  },
  actions: { // = methods
    fetchProdcts({commit}) {
      return new Promise((resolve, reject) => {
        shop.getProducts(products => {
          commit('setProducts', products);
          resolve()
        })
      })
    },
    addToCart(context, product) {
      if (product.inventory > 0) {
        context.commit('pushProductToCart', product);
      } else {
        // show out of stock message to the user
        console.log('Product is out of stock');
      }
    }
  }
})
