<template>
  <section>
    <div class="card column">
      <div class="row">
        <h1 class="title is-5">Photo de couverture</h1>
        <figure class="image is-2by2 image-cover ">
          <b-button class="btn" icon-left="upload"></b-button>
          <img :src="img" alt="Placeholder image" />
        </figure>
      </div>
    </div>
    <div class=" card  column">
      <div class="row-center">
        <h1 class="title is-5">Photos du carrousel (au plus 6)</h1>
        <b-field class="file is-primary">
          <b-upload v-model="file" class="file-label">
            <span class="file-cta">
              <b-icon class="file-icon" icon="upload"></b-icon>
            </span>
          </b-upload>
        </b-field>
        <!-- <b-button v-if="pictures.carrousel >= 6" disabled icon-left="upload"></b-button> -->
      </div>

      <div class="row-center wrap">
        <edit-picture v-for="pic in carrousel" :key="pic" :data="pic" @removeImage="removeImage"></edit-picture>
      </div>
    </div>
  </section>
</template>

<script>
import EditPicture from "./EditPicture.vue";
import { mapActions } from "vuex";
export default {
  components: { EditPicture },
  name: "edit-pictures-modal",
  data() {
    return { file: null };
  },
  props: {
    pictures: {
      type: Object,
      default: () => {
        return { carrousel: [], cover: "" };
      },
    },
  },
  watch: {
    file: async function() {
      const newFile = await this.postFile(this.file);
      this.$emit("update", { ...this.pictures, carrousel: [...this.pictures.carrousel, newFile.filename] });
    },
    deep: true,
  },
  methods: {
    ...mapActions(["postFile"]),
    removeImage(img) {
      this.pictures = { ...this.pictures, carrousel: this.carrousel.filter((i) => i != img) };
      this.$emit("update", this.pictures);
    },
  },
  computed: {
    img(name) {
      if (name) {
        return require(`@/assets/product-example.jpg`);
      } else {
        return require(`../../../../app/public/uploads/${name}`);
      }
    },
    carrousel() {
      return this.pictures.carrousel;
    },
  },
};
</script>

<style scoped>
.row {
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.row-center {
  display: flex;
  justify-content: center;
  width: 100%;
}
.column {
  display: flex;
  flex-direction: column;
  max-height: fit-content;
}
.content {
  display: flex;
  width: 100%;
  justify-content: space-evenly;
  display: flex;
  flex-direction: column;
  padding: 3em;
}
.header {
  display: flex;
  width: 100%;
  justify-content: center;
  position: relative;
}
.image-cover {
  width: 18em;
  margin: 0.4em;
}
.btn {
  position: absolute;
  left: 15em;
}
.upload-btn {
  position: absolute;
  left: 93%;
  width: 3em;
}
.wrap {
  flex-wrap: wrap;
  height: fit-content;
}
.image-carrousel {
  max-width: 20em;
  margin: 0.4em;
}
.file {
  position: absolute;
  left: 90%;
}
</style>
