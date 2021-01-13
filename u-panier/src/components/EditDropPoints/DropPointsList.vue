<template>
  <b-table :data="data">
    <b-table-column field="name" label="Nom" centered v-slot="props">
      {{ props.row.name }}
    </b-table-column>

    <b-table-column field="lat" label="latitude" numeric v-slot="props">
      {{ props.row.lat }}
    </b-table-column>

    <b-table-column field="lon" label="longitude" numeric v-slot="props">
      {{ props.row.lon }}
    </b-table-column>

    <b-table-column field="adress" label="Adresse" centered v-slot="props" >
      {{ props.row.adress }}
    </b-table-column>

    <b-table-column
      width="10"
      field="edit"
      label="Edit"
      centered
      v-slot="props"
    >
      <b-button
        icon-left="pencil"
        @click="$emit('edit', props.row._id)"
      ></b-button>
    </b-table-column>
    <b-table-column
      width="10"
      field="delete"
      label="Supprimer"
      centered
      v-slot="props"
    >
      <b-button
        icon-left="delete"
        @click="$emit('deleteItem', props.row._id)"
      ></b-button>
    </b-table-column>
  </b-table>
</template>
<script>
export default {
  name: "drop-Points-list",
  props: {
    data: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },
};
</script>

<style scoped></style>
