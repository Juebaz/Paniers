<template>
  <div class="card2">
    <div class="header">
      <h1 v-if="!item._id" class="title is-4">Ajouter un article</h1>
      <h1 v-else class="title is-4">Modifier l'article</h1>
    </div>
    <div class="content">
      <info :item="item"></info>
      <drop-points-selector :item="item"></drop-points-selector>
    </div>
    <div class="end">
      <b-button class="btn is-warning" @click="$emit('close')"
        >Annuler</b-button
      >
      <b-button class="btn is-success" @click="save()">Enregistrer</b-button>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import DropPointsSelector from "./dropPointsSelector.vue";
import Info from "./Info.vue";
export default {
  name: "edit-product-modal",
  components: { Info, DropPointsSelector },
  props: {
    item: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  methods: {
    ...mapActions(["postproduct", "updateProduct", "fetchproducts"]),
    async save() {
      if (this.item.name && this.item.price && this.item.startDate) {
        if (!this.item._id) {
          await this.postproduct({
            ...this.item,
          });
        } else {
          await this.updateProduct({
            id: this.item._id,
            product: {
              ...this.item,
            },
          });
        }
        this.$emit("close");
        return;
      }

      this.$buefy.toast.open({
        duration: 5000,
        message: `You need to provide name, price and startDate`,
        position: "is-bottom",
        type: "is-warning",
      });
    },
  },
};
</script>

<style scoped>
.card2 {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
  border-radius: 0.5em;
  width: fit-content;
  padding: 2em;
  box-shadow: 5px 0px 13px 3px rgba(10, 10, 10, 0.1);
}
.content {
  display: flex;
  width: 100%;
  justify-content: space-evenly;
}
.btn {
  margin: 0.3em;
}

.end {
  justify-content: flex-end;
  display: flex;
  align-self: flex-end;
}
.title {
  margin-top: 0.5em;
}
.header {
  display: flex;
  width: 100%;
  justify-content: center;
  position: relative;
}
.is-small {
  flex: 0.5;
}
</style>
