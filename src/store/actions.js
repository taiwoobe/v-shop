import shop from '@/api/shop.js';

export default { // = methods
    fetchProducts({commit}) {
      return new Promise((resolve, reject) => {
        shop.getProducts(products => {
          commit('setProducts', products);
          resolve();
        })
      })
    },
    addProductToCart({state, commit, getters}, product) {
      // first we check if product is available
      if (getters.productIsInStock(product)) {
        // next we check if product is already in cart
        let cartItem = state.cart.find(item => item.id === product.id);
        if (!cartItem) {
          commit('pushProductToCart', product.id);
        } else {
          commit('incrementItemQuantity', cartItem);
        }
        // create a mutation to always reduce product inventory when added to cart
        commit('decrementProductInventory', product);
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
}