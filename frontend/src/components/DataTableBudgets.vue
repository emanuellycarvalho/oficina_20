<template>
  <div class="q-pa-md">
    <q-table
      grid
      grid-header
      title="Orçamentos"
      :rows="budgets"
      :columns="columns"
      row-key="name"
      :filter="filter"
      :pagination="pagination"
    >
      <template v-slot:top-right>
        <q-btn
          flat round dense
          icon="filter_alt"
          @click="filterDialog = true"
          class="q-ml-md bg-red-5"
          text-color="white"
        />
      </template>
    </q-table>

    <q-dialog v-model="filterDialog">
      <q-card>
        <q-bar>
          <q-space />
          <q-btn dense flat icon="close" v-close-popup>
            <q-tooltip>Fechar</q-tooltip>
          </q-btn>
        </q-bar>

        <q-card-section>
            <q-form @submit="onSubmit" @reset="onReset"
            >
                <div class="row justify-center">
                    <q-input class="col col-5 q-ma-sm" name="client" v-model="budgetStore.form.client" color="red-5" label="Cliente" outlined clearable/>
                    <q-select class="col col-5 q-ma-sm" name="seller" v-model="budgetStore.form.seller_id" option-value="id" option-label="name" :options="sellers" label="Vendedor" outlined/>
                </div>
                
                <div class="row justify-center">
                    <q-input class="col col-5 q-ma-sm" color="red-5" label-color="grey-7" outlined v-model="budgetStore.filter.begin" label="Data início">
                        <template v-slot:append>
                            <q-icon name="event" />
                        </template>
                    </q-input>

                    <q-input class="col col-5 q-ma-sm" color="red-5" label-color="grey-7" outlined v-model="budgetStore.filter.end" label="Data fim">
                        <template v-slot:append>
                            <q-icon name="event" />
                        </template>
                    </q-input>
                </div>

                <div class="row justify-end q-mt-xl">
                    <q-btn label="Filtrar" type="submit" color="red-5"/>
                    <q-btn label="Resetar" type="reset" color="red-5" flat class="q-ml-sm" />
                </div>
            </q-form>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useBudgetStore } from "src/stores/budget";

const filter = ref(null);
const filterDialog = ref(false);
const budgetStore = useBudgetStore();

const props = defineProps({
    budgets: Array,
    sellers: Array,
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
  