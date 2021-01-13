<template>
  <div class="products-manager">
    <product
      v-for="b in products"
      :key="b.id"
      :isPreview="false"
      :product="b"
      v-on:addToCart="addToCart"
    ></product>
  </div>
</template>

<script>
import Product from "../components/Product.vue";
import { mapGetters, mapActions } from "vuex";
export default {
  name: "products",
  components: {
    Product,
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["products"]),
  },
  methods: {
    ...mapActions(["fetchproducts", "postToCart"]),
    async addToCart(params) {
      await this.postToCart(params);
    },
  },
  async created() {
    await this.fetchproducts();
  },
};
</script>

<style scoped>
.products-manager {
  display: flex;
}
</style>
