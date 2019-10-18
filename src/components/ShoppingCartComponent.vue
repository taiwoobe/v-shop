<template>
    <div>
        <h1>Shopping Cart</h1>
        <ul>
            <li v-for="product in products" :key="product.id"> {{ product.title }} - {{ product.price }} -- {{ product.quantity }}</li>
        </ul>
    </div>
</template>

<script>
    export default {
        computed: {
            products() {
                return this.$store.getters.cartProducts;
            }
        },
    }
</script>

<style lang="scss" scoped>

</style>