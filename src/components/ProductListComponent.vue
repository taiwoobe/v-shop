<template>
    <div>
        <img v-if="loading" src="https://i.imgur.com/JfPpwOA.gif" alt="Image Spinner">
        <ul v-else>
            <li v-for="product in products" :key="product.id">{{ product.title }} - {{ product.price }}</li>
        </ul>
    </div>
</template>

<script>
import store from '@/store/store.js';
export default {
    data() {
        return {
            // products: []
            loading: false
        }
    },
    computed: {
        products() {
            // return store.state.products;
            return store.getters.availableProducts;
        }
    },
    created() {
        this.loading = true;
        store.dispatch('fetchProdcts').then(() => {
            this.loading = false;
        });
    },
}
</script>

<style lang="scss">
</style>