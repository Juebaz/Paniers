<template>
  <figure class="image is-2by2 image-carrousel">
    <b-button class="btn" icon-left="delete" @click="$emit('removeImage', data)"></b-button>
    <img :src="img" alt="Placeholder image" />
  </figure>
</template>

<script>
export default {
  name: "edit-picture",
  props: {
    data: { type: String, default: "" },
  },
  computed: {
    img() {
      if (!this.data) {
        return require(`@/assets/product-example.jpg`);
      } else {
        return require(`../../../../app/public/uploads/${this.data}`);
      }
    },
  },
  methods: {},
};
</script>

<style scoped>
.btn {
  position: absolute;
  left: 15em;
}
</style>
