<template>
  <div class="container">
    <h1 class="title is-2">Gérer mes produits</h1>
    <h1 class="title is-4">Produits individuels</h1>
    <b-button
      v-if="!edit"
      icon-left="plus"
      class="is-info add-btn"
      @click="addItem"
      >Ajouter</b-button
    >
    <div :class="edit ? 'center' : ''">
      <edit-product-modal
        v-on:close="edit = false"
        v-if="edit"
        :item="activeItem"
      ></edit-product-modal>
      <products-list
        v-else
        v-on:edit="openModal"
        v-on:seeItem="seeItem"
        v-on:deleteItem="deleteItem"
        :products="products"
      ></products-list>
    </div>
  </div>
</template>

<script>
import EditProductModal from "../components/EditProduct/EditProductModal";
import ProductsList from "../components/EditProduct/ProductsList";
import Product from "../components/Product.vue";
import { mapGetter, mapActions, mapGetters } from "vuex";
export default {
  name: "ProductsManager",
  data: function() {
    return {
      edit: false,
      activeItem: "",
    };
  },
  components: {
    ProductsList,
    EditProductModal,
  },
  computed: {
    ...mapGetters(["products"]),
  },
  methods: {
    ...mapActions(["fetchproducts", "deleteProduct"]),
    addItem() {
      this.edit = true;
      this.activeItem = {
        name: "",
        description: "",
        dropPoints: [],
        price: 0,
        startDate: new Date(),
        img: "",
      };
    },
    openModal(id) {
      this.edit = true;
      this.activeItem = this.products.find((i) => i._id == id);
    },
    seeItem(id) {
      this.$buefy.modal.open({
        parent: this,
        component: Product,
        hasModalCard: true,
        trapFocus: true,
        props: {
          product: this.products.find((i) => i._id == id),
          isPreview: true,
        },
      });
    },
    async deleteItem(id) {
      await this.deleteProduct(id);
    },
  },
  async created() {
    await this.fetchproducts();
  },
};
</script>

<style scoped>
.center {
  display: flex;
  justify-content: center;
}

.container {
  flex: 1;
  display: flex;
  flex-direction: column;
}
.add-btn {
  align-self: flex-end;
  margin: 1em;
}
</style>
