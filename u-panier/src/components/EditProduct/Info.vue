<template>
  <div style="display: flex; width:100%">
    <div class="column">
      <b-field label="Nom">
        <b-input v-model="item.name"></b-input>
      </b-field>
      <b-field label="Prix">
        <b-input placeholder="Number" type="number" v-model="item.price" min="0"> </b-input>
      </b-field>

      <b-field class="file is-primary" :class="{ 'has-name': !!file }">
        <b-upload v-model="file" class="file-label">
          <span class="file-cta">
            <b-icon class="file-icon" icon="upload"></b-icon>
            <span class="file-label">Click to upload</span>
          </span>
          <span class="file-name" v-if="file">
            {{ file.name }}
          </span>
        </b-upload>
      </b-field>
    </div>
    <div class="column">
      <b-field label="Description">
        <b-input style="width: 20em;" maxlength="400" type="textarea" v-model="item.description"></b-input>
      </b-field>

      <section>
        <b-field label="Disponible à partir du">
          <b-datepicker ref="datepicker" expanded placeholder="Select a date" v-model="item.startDate"> </b-datepicker>
          <b-button @click="$refs.datepicker.toggle()" icon-left="calendar-today" type="is-primary" />
        </b-field>
      </section>
    </div>
  </div>
</template>

<script>
import { mapAction, mapActions } from "vuex";
import fs from "fs";
export default {
  name: "info",
  components: {},
  data() {
    return {
      file: { filename: this.item.img },
    };
  },
  watch: {
    file: async function() {
      if (this.item.img) {
        await this.removeFile(this.item.img);
      }
      const file = await this.postFile(this.file);
      this.item.img = file.filename;
    },
    deep: true,
  },
  methods: {
    ...mapActions(["postFile", "removeFile"]),
  },
  props: {
    item: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
};
</script>

<style scoped>
.column {
  display: flex;
  flex-direction: column;
  width: 100%;

  align-items: center;
}
</style>
