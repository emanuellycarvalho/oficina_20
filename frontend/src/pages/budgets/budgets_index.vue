<template>
    <q-page class="flex flex-center">
        <DataTableBudgets :budgets="budgets"></DataTableBudgets>
    </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useBudgetStore } from "src/stores/budget";
import DataTableBudgets from "/src/components/DataTableBudgets.vue";

const budgetStore = useBudgetStore();
const budgets = ref([]);

onMounted(() =>{
    budgetStore.getBudgets();
    budgets.value = budgetStore.budgets;
})

</script>
  