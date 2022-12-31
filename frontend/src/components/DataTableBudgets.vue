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

        <template v-slot:item="props">
            <div class="q-pa-xs col-xs-12 col-sm-6 col-md-4">
                <q-card>
                    <q-card-section class="text-left">
                        <div class="text-capitalize">
                            <strong>Cliente: </strong> 
                            <br> {{ props.row.client }}
                        </div>

                        <div class="text-capitalize q-mt-sm">
                            <strong>Valor: </strong> 
                            <br> {{ props.row.value }}
                        </div>

                        <div class="q-mt-sm">
                            <strong>Descrição: </strong> 
                            <br> {{ props.row.description }}
                        </div>

                        <div class="text-capitalize q-mt-sm">
                            <strong>Vendedor: </strong> 
                            <br> {{ props.row.seller.name }}
                        </div>
                    </q-card-section>

                    <q-separator />

                    <q-card-section class="q-gutter-sm row justify-end">
                        <q-btn round size="sm" color="accent" icon="edit">
                            <q-tooltip>Editar</q-tooltip>
                        </q-btn>
                        <q-btn round size="sm" color="red" icon="delete">
                            <q-tooltip>Excluir</q-tooltip>
                        </q-btn>
                    </q-card-section>
                </q-card>
            </div>
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
  