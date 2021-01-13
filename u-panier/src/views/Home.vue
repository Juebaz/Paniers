<template>
  <div class="home">
    <products></products>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Products from "./Products.vue";
@Component({
  components: {
    Products,
  },
})
export default class Home extends Vue {}
</script>
