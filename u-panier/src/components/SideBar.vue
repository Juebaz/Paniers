<template>
  <div class="sidebar-page">
    <section class="sidebar-layout">
      <b-sidebar position="static" :fullheight="true" type="is-white" open>
        <div class="p-1">
          <div class="block">
            <!-- <img
              :src="getImg"
              class="logo"
              alt="Lightweight UI components for Vue.js based on Bulma"
            /> -->
          </div>
          <b-menu class="is-custom-mobile">
            <b-menu-list label="Menu">
              <b-menu-item icon="cog-outline" label="Mes produits">
                <b-menu-item icon="calendar" label="Abonnement" href="/productsManager"></b-menu-item>
                <b-menu-item icon="carrot" label="Produit individuel" href="/productsManager"></b-menu-item>
              </b-menu-item>
              <b-menu-item icon="map" label="Point de chutes" href="/dropPointsManager"></b-menu-item>
              <b-menu-item icon="home-variant" label="Mes informations" href="/FarmInfo"></b-menu-item>
              <b-menu-item icon="eye" label="Visualiser">
                <b-menu-item icon="" label="Produits" href="/"></b-menu-item>
                <b-menu-item icon="cart" label="Panier" href="/cart"></b-menu-item>
              </b-menu-item>
              <b-menu-item icon="manager" label="Mes commandes" href="/"></b-menu-item>
              <b-menu-item icon="person" label="Mes clients" href="/"></b-menu-item>
              <b-menu-item icon="product" label="Mon inventaire" href="/FarmInfo"></b-menu-item>
            </b-menu-list>
          </b-menu>
        </div>
      </b-sidebar>
    </section>
  </div>
</template>

<script>
export default {
  name: "side-bar",
  computed: {
    getImg() {
      return require(`@/assets/logo.jpg`);
    },
  },
};
</script>

<style scoped>
.p-1 {
  padding: 1em;
}
.sidebar-page {
  display: flex;
  flex-direction: column;
  min-height: 100%;
  margin-right: 1em;
}
.sidebar-layout {
  display: flex;
  flex-direction: row;
  min-height: 100%;
}
.logo {
  width: 10em;
  height: 10em;
  border-radius: 50%;
}
</style>
