import Vue from 'vue'
import Vuex from 'vuex'
import shop from '@/api/shop.js';

Vue.use(Vuex)

export default new Vuex.Store({
  state: { // = data
    products: [],
    cart: [],
    checkoutStatus: null
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
        } else {
          context.commit('incrementItemQuantity', cartItem);
        }
        // create a mutation to always reduce product inventory when added to cart
        context.commit('decrementProductInventory', product);
      } else {
        // show out of stock message to the user
        console.log('Product is out of stock');
      }
    },
    checkout({state, commit}) {
      shop.buyProducts(
        state.cart,
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
