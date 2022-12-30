<template>
  <div class="q-pa-md">
    <q-table
      grid
      grid-header
      title="Orçamentos"
      :rows="budgets"
      :columns="columns"
      row-key="name"
      :filter="stringFilter"
      :pagination="pagination"
    >
      <template v-slot:top-right>

      </template>
    </q-table>
  </div>
</template>

<script setup>
import { ref } from "vue";
const stringFilter = ref(null);

const props = defineProps({
    budgets: Array,
});

const pagination = ref({
    rowsPerPage: 6
});

const columns = ref([
    {
        name: 'client',
        required: true,
        label: 'Cliente',
        align: 'left',
        field: budget => budget.client,
        sortable: true
    },
    {
        name: 'value',
        required: true,
        label: 'Valor',
        align: 'center',
        field: budget => budget.value,
        sortable: true
    },
    {
        name: 'description',
        required: true,
        label: 'Descrição',
        align: 'left',
        field: budget => budget.description,
        sortable: false
    },
    {
        name: 'seller',
        required: true,
        label: 'Vendedor',
        align: 'center',
        field: budget => budget.seller.name,
        sortable: true
    },
]);

</script>
  