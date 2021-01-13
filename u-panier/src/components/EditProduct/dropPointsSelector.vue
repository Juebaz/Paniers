<template>
  <div class="column">
    <b-checkbox v-model="active">Ajouter des points de chutes</b-checkbox>
    <div v-if="active" class="column is-small">
      <b-dropdown aria-role="list" class="drop-button" v-model="selected">
        <button class="button is-ligth" slot="trigger">
          <span>Point de chutes</span>
          <b-icon icon="menu-down"></b-icon>
        </button>

        <b-dropdown-item
          aria-role="listitem"
          v-for="pt in dropPoints"
          :key="pt.name"
          :value="pt"
          @click="addDP"
          >{{ pt.name }}</b-dropdown-item
        >
      </b-dropdown>
      <div class="field tags" v-for="dp in item.dropPoints" :key="dp.dropPoint">
        <b-tag
          attached
          closable
          aria-close-label="Close tag"
          @close="removeDP(dp)"
        >
          {{ getName(dp) }}
        </b-tag>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "drop-point-selector",
  props: {
    item: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  data() {
    return {
      active: false,
      selected: {},
    };
  },
  computed: {
    ...mapGetters(["dropPoints"]),
  },

  methods: {
    ...mapActions(["fetchDropPoints"]),
    getName(id) {
      const name = this.dropPoints.find((i) => i._id == id).name;
      return name;
    },
    addDP() {
      if (!this.item.dropPoints.find((i) => i == this.selected._id)) {
        this.item.dropPoints.push(this.selected._id);
      }
    },
    removeDP(id) {
      this.item.dropPoints = this.item.dropPoints.filter((i) => i != id);
    },
  },
  async created() {
    await this.fetchDropPoints();
    if (this.item.dropPoints) {
      this.active = true;
    }
  },
};
</script>

<style scoped>
.tags {
  margin: 0.5em;
}
.column {
  display: flex;
  flex-direction: column;
  width: 100%;
  min-width: 13em;
  align-items: center;
}
</style>
