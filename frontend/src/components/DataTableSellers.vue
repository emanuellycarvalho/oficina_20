<template>
    <q-table
        title="Vendedores"
        row-key="id"
        class="q-pa-sm"
        :filter="filter"
        :rows="sellers"
        :columns="columns"
        :pagination="pagination"
        virtual-scroll
    >

        <template v-slot:top-right>
            <q-input borderless dense debounce="300" v-model="filter" placeholder="Buscar">
                <template v-slot:append>
                    <q-icon name="search" />
                </template>
            </q-input>
        </template>
    </q-table>
</template>

<script setup>
import { ref } from "vue";

const filter = ref(null);

const props = defineProps({
    sellers: Array,
});

const pagination = ref({
    rowsPerPage: 6
});

const columns = ref([
    {
        name: 'name',
        required: true,
        label: 'Nome',
        align: 'left',
        field: seller => seller.name,
        sortable: true
    },
    {
        name: 'phone',
        required: false,
        label: 'Telefone',
        align: 'center',
        field: seller => seller.phone,
        sortable: false
    },
    {
        name: 'budgetAmount',
        required: true,
        label: 'Orçamentos feitos',
        align: 'center',
        field: seller => seller.budgetAmount,
        sortable: true
    },
]);

</script>
  