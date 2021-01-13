<template>
  <div class="card column">
    <b-button class="btn" @click="$emit('close')" icon-left="close"></b-button>
    <div class="row">
      <div class="column">
        <b-field label="Nom">
          <b-input v-model="info.name"></b-input>
        </b-field>
        <b-field label="Adresse">
          <b-input icon="home" v-model="info.adress"></b-input>
        </b-field>
      </div>
      <div class="column">
        <b-field label="Téléphone">
          <b-input type="tel" icon="phone" v-model="info.phone"></b-input>
        </b-field>
        <b-field label="Courriel">
          <b-input type="email" icon="email" v-model="info.email"></b-input>
        </b-field>
      </div>
      <div class="column">
        <b-field label="Compte Facebook">
          <b-input icon="facebook" v-model="info.facebook"></b-input>
        </b-field>
        <b-field label="Compte instagram">
          <b-input icon="instagram" v-model="info.instagram"></b-input>
        </b-field>
      </div>
    </div>
    <div class="row">
      <b-field label="message d'accueil" style="flex: 1;">
        <b-input
          type="textarea"
          minlength="10"
          maxlength="100"
          placeholder="bienvenue sur notre site web..."
          v-model="info.msg"
        >
        </b-input>
      </b-field>
    </div>
    <b-button class="is-success save-btn" @click="save">Enregistrer</b-button>
  </div>
</template>

<script>
export default {
  name: "farm-info-modal",
  props: {
    info: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  methods: {
    save() {
      if (this.info.name && this.info.adress) {
        console.log("validation to do ");
        this.$emit("save");
      } else {
        alert("fields missing, to do error msg");
      }
    },
  },
};
</script>

<style scoped>
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
.btn {
  width: 3em;
  align-self: flex-end;
}
.save-btn {
  width: fit-content;
  align-self: flex-end;
}
</style>
