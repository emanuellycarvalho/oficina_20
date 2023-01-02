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
                        <q-btn round size="sm" color="accent" icon="edit" @click="$emit('editBudget', props.row)">
                            <q-tooltip>Editar</q-tooltip>
                        </q-btn>
                        <q-btn round size="sm" color="red" icon="delete" @click="confirmDestroy(props.row)">
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
import { useQuasar } from "quasar";
import { useBudgetStore } from "src/stores/budget";
import { useSellerStore } from "src/stores/seller";

const budgetStore = useBudgetStore();
const newBudgetDialog = ref(false);
const stringFilter = ref(null);
const $q = useQuasar();

const budget = ref({
    id: null,
    client: "",
    description: "",
    value: null,
    seller_id: null
});

const props = defineProps({
    budgets: Array,
});

const pagination = ref({
    rowsPerPage: 6
});

const editBudget = (budget1) => {
    budget.value = budget1;
    newBudgetDialog.value = true;
}

const confirmDestroy = (budget) => {
    $q.dialog({
    title: `Confirmar`,
    message: `Tem certeza que deseja excluir o orçamento de <br> <b>${budget.seller.name}</b> com o(a) cliente <br> <b>${budget.client}</b>?`,
    html: true,
    cancel: {
        label: "Cancelar",
        color: "secondary"
    },
    ok: {
        label: "Excluir",
        color: "negative"
    },
    persistent: false
    }).onOk(() => {
        budgetStore.destroy(budget.id);
    });
}

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
  