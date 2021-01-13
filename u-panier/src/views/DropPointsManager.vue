<template>
  <div class="container" :class="edit ? 'center' : ''">
    <h1 class="title is-2">Gérer mes points de chutes</h1>
    <b-button v-if="!edit" icon-left="plus" class="is-info add-btn" @click="addItem">Ajouter</b-button>
    <div>
      <drop-points-list :data="dropPoints" @edit="editDP" @deleteItem="deleteDP" v-if="!edit"></drop-points-list>
      <drop-point-modal v-if="edit" :data="activeItem ? activeItem : undefined" @close="close"></drop-point-modal>
    </div>
    <div>
      map vue
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import DropPointModal from "../components/EditDropPoints/DropPointModal.vue";
import DropPointsList from "../components/EditDropPoints/DropPointsList.vue";
export default {
  name: "drop-points-manager",
  components: { DropPointsList, DropPointModal },
  data() {
    return {
      edit: false,
      activeItem: {},
    };
  },
  computed: {
    ...mapGetters(["dropPoints"]),
  },
  methods: {
    ...mapActions(["deleteDropPoint", "fetchDropPoints"]),
    addItem() {
      this.edit = true;
      this.activeItem = {};
    },
    editDP(id) {
      this.edit = true;
      this.activeItem = this.dropPoints.find((i) => i._id == id);
    },
    async deleteDP(id) {
      await this.deleteDropPoint(id);
    },
    close() {
      this.edit = false;
      this.activeItem = {};
    },
  },
  async created() {
    await this.fetchDropPoints();
  },
};
</script>

<style scoped>
.center {
  display: flex;
  align-items: center;
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
