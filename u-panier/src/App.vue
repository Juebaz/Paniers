<template>
  <div id="app">
    <side-bar></side-bar>
    <router-view />
    <link rel="stylesheet" href="https://cdn.materialdesignicons.com/5.3.45/css/materialdesignicons.min.css" />
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import SideBar from "./components/SideBar.vue";

export default Vue.extend({
  components: {
    SideBar,
  },
  computed: {},
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-left: 1em;
  margin-right: 1em;
  display: flex;
  height: 100vh;
  background-image: linear-gradient(45deg, rgba(248, 248, 248, 0.76), rgba(255, 255, 255, 0.58)),
    url("~@/assets/HealthyFood_07.jpg");

  /* background: url('/assets/veges.jpg') no-repeat center center fixed;  */
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
}
</style>
