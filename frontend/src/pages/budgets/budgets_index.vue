<template>
    <q-page class="col-12">
        <div class="row">
            <div class="col-lg-3 col-md-3 col-sm-12">
                <CardFilters :currentFilter="budgetStore.filter" :sellers="sellerStore.sellers" @filter="filter($event)"></CardFilters>
            </div>

            <div class="col-lg-9 col-md-8 col-sm-12">
                <DataTableBudgets :budgets="budgetStore.budgets"></DataTableBudgets>
            </div>
        </div>
    </q-page>
</template>

<script setup>
import { onMounted } from 'vue';
import { useBudgetStore } from "src/stores/budget";
import { useSellerStore } from "src/stores/seller";
import DataTableBudgets from "/src/components/DataTableBudgets.vue";
import CardFilters from "src/components/CardFilter.vue";

const budgetStore = useBudgetStore();
const sellerStore = useSellerStore();

const filter = (filter) => {
    budgetStore.filter = filter;
    budgetStore.filterBudgets(filter); 
}

onMounted(() =>{
    budgetStore.getBudgets();
    sellerStore.getActiveSellers();
});

</script>
  