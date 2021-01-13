<template>
  <div class="card column">
    <b-button class="btn" @click="$emit('editInfo')" icon-left="pencil"></b-button>
    <div class="row">
      <div class="column">
        <b-field label="Nom">
          {{ info.name }}
        </b-field>
        <b-field label="Adresse">
          {{ info.adress }}
        </b-field>
      </div>
      <div class="column">
        <b-field label="Téléphone">
          {{ info.phone }}
        </b-field>
        <b-field label="Courriel">
          {{ info.email }}
        </b-field>
      </div>
      <div class="column">
        <b-field label="Compte Facebook"> <b-icon icon="facebook"></b-icon>{{ info.facebook }} </b-field>
        <b-field label="Compte instagram"> <b-icon icon="instagram"></b-icon>{{ info.instagram }} </b-field>
      </div>
    </div>
    <div class="row">
      <b-field label="message d'accueil" style="flex: 1;">
       {{info.msg}}
      </b-field>
    </div>
  </div>
</template>

<script>
export default {
  name: "farm-info-view",
  props: {
    info: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
};
</script>

<style>
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
</style>
