<template>
  <div class="card">
    <div class="card-image">
      <figure class="image is-2by2">
        <img :src="productImg" alt="Placeholder image" />
      </figure>
    </div>
    <p class="title">
      {{ product.name }}
    </p>
    <div class="card-content">
      <span>{{ product.description }}</span>
      <div class="left-container">
        <span> <b-icon icon="currency-usd"></b-icon>{{ product.price }}</span>
      </div>
      <div class="right-container">
        <b-dropdown v-if="dropPoints.length > 1" aria-role="list" class="drop-button" v-model="dropPoint">
          <button class="button is-primary is-ligth" slot="trigger">
            <span>{{ dropPoint.name }}</span>
            <b-icon icon="menu-down"></b-icon>
          </button>
          <b-dropdown-item aria-role="listitem" v-for="pt in dropPoints" :key="pt.name" :value="pt">{{
            pt.name
          }}</b-dropdown-item>
        </b-dropdown>
        <div style="margin: 0.5em" v-else-if="dropPoints.length == 1">
          <b-icon icon="map-marker"></b-icon> {{ dropPoints[0].name }}
        </div>
        <!-- <b-button disabled>Ajouter au panier</b-button> -->
        <b-button @click="addToCart">Ajouter au panier</b-button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "product",
  data() {
    return {
      dropPoints: [],
      dropPoint: { name: "point de chute" },
      isPreview: { type: Boolean, default: false },
    };
  },
  props: {
    product: { type: Object },
  },
  computed: {
    productImg: function() {
      if (this.product.img) {
        return require(`../../../app/public/uploads/${this.product.img}`);
      }
      return require(`@/assets/product-example.jpg`);
    },
  },
  methods: {
    ...mapActions(["fetchDropPoint"]),
    addToCart() {
      if (this.dropPoint.lat) {
        this.$emit("addToCart", {
          id: this.product._id,
          dropPoint: this.dropPoint._id,
        });
      } else {
        this.$buefy.toast.open({
          duration: 4000,
          message: `Veuillez choisir un point de chute`,
          position: "is-bottom",
          type: "is-warning",
        });
      }
    },
  },
  created() {
    Promise.all(this.product.dropPoints.map((dp) => this.fetchDropPoint(dp))).then((res) => (this.dropPoints = res));
  },
};
</script>

<style scoped>
.card {
  width: 25vw;
  height: fit-content;
  margin: 1em;
  max-width: 300px;
}
.card-content {
  padding-top: 0em;
}
.card-header-title {
  justify-content: center;
}
.right-container {
  margin-top: 1em;
  justify-content: flex-end;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}
.left-container {
  margin-top: 1em;
  justify-content: flex-end;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.drop-button {
  margin-bottom: 1em;
}
.title {
  margin: 0.5em;
  margin-bottom: 0.1em;
}
</style>
