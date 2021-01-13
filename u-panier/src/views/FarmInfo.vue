<template>
  <div class="container">
    <h1 class="title is-2">Gérer mes informations</h1>
    <b-button icon-left="eye">Visualiser</b-button>
    <div class="card">
      Ces informations apparaitront sur la page d'accueil de votre site web. <br />Vous pouvez choisir quelles
      informations seront présentées.
    </div>

    <farm-info-modal :info="farmInfo" v-if="edit" @close="editInfo(false)" @save="save()"></farm-info-modal>
    <farm-info-view :info="farmInfo" v-if="!edit" @editInfo="editInfo(true)"></farm-info-view>
    <div class="card">
      <div class="row center">
        <h1 class="title is-4">Photos affichée sur la page d'accueil</h1>
      </div>
      <edit-picures-modal :pictures="farmInfo.pictures" @update="update" ></edit-picures-modal>
    </div>
  </div>
</template>

<script>
import EditPicuresModal from "../components/EditFarmInfo/EditPicuresModal.vue";
import FarmInfoModal from "../components/EditFarmInfo/FarmInfoModal.vue";
import FarmInfoView from "../components/EditFarmInfo/FarmInfoView.vue";
import { mapActions, mapGetters } from "vuex";
export default {
  components: {
    EditPicuresModal,
    FarmInfoModal,
    FarmInfoView,
  },
  data() {
    return {
      edit: false,
    };
  },
  computed: {
    ...mapGetters(["farmInfo"]),
  },
  methods: {
    ...mapActions(["fetchFarmInfo", "updateFarmInfo"]),
    close() {
      this.editPicturesModal = false;
    },
    editInfo(bool) {
      this.edit = bool;
    },
    async save() {
      await this.updateFarmInfo(this.farmInfo);
      this.editInfo(false);
    },
    async update(pictures) {
      await this.updateFarmInfo({ ...this.farmInfo, pictures: pictures });
    },
  },
  async created() {
    await this.fetchFarmInfo();
  },
};
</script>

<style scoped>
/* .container {
    flex: 1;
    display: flex;
    flex-direction: column;
  } */
.card {
  margin: 1em;
  padding: 1em;
}
.row {
  display: flex;
}
.column {
  display: flex;
  flex-direction: column;
  max-height: fit-content;
}
.center {
  align-items: center;
  justify-content: center;
}
</style>
