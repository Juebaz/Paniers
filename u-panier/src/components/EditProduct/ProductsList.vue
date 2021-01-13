<template>
  <b-table :data="products">
    <b-table-column field="name" label="Nom" centered v-slot="props">
      {{ props.row.name }}
    </b-table-column>

    <b-table-column field="price" label="Prix" numeric v-slot="props">
      {{ props.row.price }} $
    </b-table-column>

    <b-table-column
      field="date"
      label="Date de disponibilitée"
      centered
      v-slot="props"
    >
      <span class="tag is-success">
        {{ new Date(props.row.startDate).toLocaleDateString() }}
      </span>
    </b-table-column>

    <b-table-column width="10" field="see" label="Visualiser" centered v-slot="props">
      <b-button
        icon-left="eye"
        @click="$emit('seeItem', props.row._id)"
      ></b-button>
    </b-table-column>

    <b-table-column width="10" field="edit" label="Edit" centered v-slot="props">
      <b-button
        icon-left="pencil"
        @click="$emit('edit', props.row._id)"
      ></b-button>
    </b-table-column>
    <b-table-column  width="10" field="delete" label="Supprimer" centered v-slot="props">
      <b-button
        icon-left="delete"
        @click="$emit('deleteItem', props.row._id)"
      ></b-button>
    </b-table-column>
  </b-table>
</template>
<script>
export default {
  name: "products-list",
  props: {
    products: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },
};
</script>

<style></style>
