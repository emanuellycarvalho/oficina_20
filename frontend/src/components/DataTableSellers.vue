<template>
    <q-table
        class="q-pa-sm"
        title="Vendedores"
        :filter="filter"
        :rows="sellers"
        :columns="columns"
        row-key="id"
        virtual-scroll
        v-model:pagination="pagination"
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
import { ref, onMounted } from "vue";
import { useSellerStore } from "src/stores/seller";

const sellerStore = useSellerStore();
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

onMounted(() =>{
    console.log(props);
})

</script>
  