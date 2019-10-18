<template>
    <div>
        <img v-if="loading" src="https://i.imgur.com/JfPpwOA.gif" alt="Image Spinner">
        <ul v-else>
            <li v-for="product in products" :key="product.id">{{ product.title }} - {{ product.price }} - {{ product.inventory }}
                <button @click="addProductToCart(product)">Add to Cart </button>
            </li>
        </ul>
    </div>
</template>

<script>
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
            return this.$store.getters.availableProducts;
        }
    },
    created() {
        this.loading = true;
        this.$store.dispatch('fetchProdcts').then(() => {
            this.loading = false;
        });
    },
    methods: {
        addProductToCart(product) {
            this.$store.dispatch('addProductToCart', product);
        }
    },
}
</script>

<style lang="scss">
</style>