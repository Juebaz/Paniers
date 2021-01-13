<template>
  <div class="card">
    <div class="left-card">
      <img class="img" :src="productImg" />
    </div>
    <div class="center-card">
      <div class="label">Article</div>
      <div class="article-description">
        <div class="title is-4">
          {{ item.name }}
        </div>
        <div>Point de chute: {{ dropName }}</div>
      </div>
    </div>
    <div class="quantity-card">
      <div class="label">Quantité</div>
      <div class="quantity">
        <b-button v-if="quantity > 1" @click="$emit('removeOne')">-</b-button>
        <b-button disabled v-else>-</b-button>
        <span class="quantity-number">{{ quantity }} </span>
        <b-button @click="$emit('addOne')">+</b-button>
      </div>
    </div>
    <div class="price-card">
      <div class="label">Prix</div>
      <div class="price">{{ totalPrice }} $</div>
      <b-button
        class="delete-btn"
        type="is-danger"
        icon-right="delete"
        @click="deleteItem()"
      />
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "cartarticle",
  data: function() {
    return {
      item: {},
      dropName: "",
    };
  },
  props: {
    dropPointID: { type: String },
    itemId: { type: String },
    quantity: { type: Number },
  },
  methods: {
    ...mapActions(["fetchproduct", "deleteCartItem", "fetchDropPoint"]),
    async deleteItem() {
      await this.deleteCartItem(this.item._id);
    },
  },
  computed: {
    productImg() {
      if (this.item.img) {
        return require(`@/assets/${this.item.img}`);
      }
      return require("@/assets/product-example.jpg"); // img basic for product
    },
    totalPrice() {
      return this.quantity * this.item.price;
    },
  },
  async created() {
    this.item = await this.fetchproduct(this.itemId);
    const drop = await this.fetchDropPoint(this.dropPointID);
    this.dropName = drop.name;
  },
};
</script>

<style scoped>
.card {
  display: flex;
  padding: 1em;
}

.center-card {
  flex: 2;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-left: 2em;
}

.left-card {
  flex: 1.4;
}

.quantity-card {
  flex: 0.7;
  display: flex;
  flex-direction: column;
}

.price-card {
  flex: 0.7;
  position: relative;
}

.quantity-number {
  font-size: x-large;
  margin-left: 0.5em;
  margin-right: 0.5em;
}

.img {
  object-fit: cover;
  height: 100%;
  width: 100%;
  max-height: unset;
  max-width: unset;
  border-radius: 0.5em;
}

.quantity {
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  margin-top: 1em;
}

.price {
  margin-top: 1em;
  font-size: x-large;
}

.article-description {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.delete-btn {
  position: absolute;
  top: 80%;
}

@media screen and (max-width: 975px) {
  .img-container {
    width: 140px;
    height: 140px;
  }
  .card {
    width: 100vw;
  }
}
@media screen and (max-width: 600px) {
  .img-container {
    width: 100px;
    height: 100px;
  }
  .card {
    width: 100vw;
  }
}
</style>
