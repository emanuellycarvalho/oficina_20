<template>
    <q-page class="flex flex-center">
        <DataTableBudgets :budgets="budgetStore.budgets" :sellers="sellerStore.sellers"></DataTableBudgets>
    </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useBudgetStore } from "src/stores/budget";
import { useSellerStore } from "src/stores/seller";
import DataTableBudgets from "/src/components/DataTableBudgets.vue";

const budgetStore = useBudgetStore();
const sellerStore = useSellerStore();
const budgets = ref([]);

onMounted(() =>{
    budgetStore.getBudgets();
    sellerStore.getActiveSellers();
})

</script>
  