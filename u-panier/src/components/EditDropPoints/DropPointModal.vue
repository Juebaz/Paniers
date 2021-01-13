<template>
  <section>
    <div class="card2">
      <div class="header">
        <h1 v-if="!data._id" class="title is-4">Ajouter un point de chute</h1>
        <h1 v-else class="title is-4">Modifier un point de chute</h1>
      </div>
      <div class="content">
        <b-field label="Nom">
          <b-input v-model="data.name"></b-input>
        </b-field>
        <b-field label="Adresse">
          <b-input v-model="data.adress"></b-input>
        </b-field>
        <b-field label="longitude">
          <b-input type="number" min="-180" max="180" v-model="data.lon"></b-input>
        </b-field>
        <b-field label="latitude">
          <b-input type="number" min="-90" max="90" v-model="data.lat"></b-input>
        </b-field>
      </div>
      <div class="end">
        <b-button class="btn is-warning" @click="$emit('close')">Annuler</b-button>
        <b-button class="btn is-success" @click="save">Enregistrer</b-button>
      </div>
    </div>
  </section>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "drop-point-modal",
  data() {
    return {};
  },
  props: {
    data: { type: Object },
  },
  methods: {
    ...mapActions(["postDropPoint", "updateDropPoint"]),
    async save() {
      if (this.data.name && this.data.adress && this.data.lon && this.data.lat) {
        if (this.data._id) {
          await this.updateDropPoint({
            id: this.data._id,
            dropPoint: this.data,
          });
        } else {
          await this.postDropPoint(this.data);
        }
        this.$emit("close");
      }
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
  display: flex;
  flex-direction: column;
  padding: 3em;
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
