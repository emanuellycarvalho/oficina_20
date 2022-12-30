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
            <q-form>
                <div class="row justify-center">
                    <q-input class="col-12 q-pa-md" name="client" v-model="budgetStore.filter.client" color="red-5" label="Cliente" outlined clearable/>
                </div>

                <div class="row justify-center">
                    <q-select class="col-12 q-pa-md" name="seller" v-model="budgetStore.filter.seller" emit-value map-options color="red-5" option-value="id" option-label="name" :options="sellers" label="Vendedor" outlined/>
                </div>
                
                <div class="row justify-center">
                  <q-input class="col-6 q-pa-md" v-model="budgetStore.filter.begin" mask="date" :rules="['date']" outlined color="red-5">
                    <template v-slot:append>
                      <q-icon name="event" class="cursor-pointer">
                        <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                          <q-date v-model="budgetStore.filter.begin" color="red-5" minimal>
                            <div class="row items-center justify-end">
                              <q-btn v-close-popup label="OK" color="red-5" flat/>
                            </div>
                          </q-date>
                        </q-popup-proxy>
                      </q-icon>
                    </template>
                  </q-input>

                  <q-input class="col-6 q-pa-md" v-model="budgetStore.filter.end" mask="date" :rules="['date']" outlined color="red-5">
                    <template v-slot:append>
                      <q-icon name="event" class="cursor-pointer">
                        <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                          <q-date v-model="budgetStore.filter.end" color="red-5" minimal>
                            <div class="row items-center justify-end">
                              <q-btn v-close-popup label="OK" color="red-5" flat/>
                            </div>
                          </q-date>
                        </q-popup-proxy>
                      </q-icon>
                    </template>
                  </q-input>
                </div>

                <div class="row justify-end q-mt-xl">
                    <q-btn label="Filtrar" @click="() => {$emit('filter', budgetStore.filter); filterDialog = false}" color="red-5"/>
                    <q-btn label="Resetar" @click.prevent.stop="budgetStore.resetFilter" color="red-5" flat class="q-ml-sm" />
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

const emits = ['filter'];

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
  