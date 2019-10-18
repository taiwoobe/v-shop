<template>
  <div id="app">
    <ProductListComponent/>
    <hr>
    <ShoppingCartComponent/>
  </div>
</template>

<script>
import ProductListComponent from './components/ProductListComponent.vue';
import ShoppingCartComponent from './components/ShoppingCartComponent.vue';

export default {
  name: 'app',
  components: {
    ProductListComponent,
    ShoppingCartComponent
  }
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
