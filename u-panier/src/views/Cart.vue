<template>
  <div>
    <h1 class="title is-1">Mon panier</h1>
    <cart-article
      class="cart-article"
      v-for="item in cart.items"
      :key="item.id"
      :itemId="item.id"
      :quantity="item.quantity"
      :dropPointID="item.dropPoint"
      v-on:addOne="addOne(item.id)"
      v-on:removeOne="removeOne(item.id)"
    />
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import CartArticle from "../components/CartArticle.vue";
export default {
  components: { CartArticle },
  name: "cart",
  computed: {
    ...mapGetters(["cart"]),
  },
  methods: {
    ...mapActions(["fetchCart", "postToCart", "updateCartItems"]),
    async addOne(id) {
      const newItems = this.cart.items.map((i) => {
        if (i.id == id) {
          return { ...i, quantity: i.quantity + 1 };
        }
        return i;
      });

      await this.updateCartItems(newItems);
    },
    async removeOne(id) {
      const newItems = this.cart.items.map((i) => {
        if (i.id == id) {
          return { ...i, quantity: i.quantity - 1 };
        }
        return i;
      });

      await this.updateCartItems(newItems);
    },
  },
  async created() {
    await this.fetchCart();
  },
};
</script>

<style scoped>
.cart-article {
  height: 30vh;
  width: 80vw;
  max-height: 300px;
  max-width: 1000px;
  margin: 1em;
}
</style>
