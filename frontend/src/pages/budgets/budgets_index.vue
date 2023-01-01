<template>
    <q-page class="col-12">
        <div class="row">
            <div class="col-lg-3 col-md-3 col-sm-12">
                <CardFilters :currentFilter="budgetStore.filter" :sellers="sellerStore.sellers" @filter="filter($event)"></CardFilters>
                <div id="new-budget" class="q-pa-md">
                    <q-btn 
                        label="Novo orçamento" 
                        class="q-pa-md full-width" 
                        color="primary" 
                        size="lg" 
                        @click="createBudget()"
                    />

                    <q-dialog v-model="newBudgetDialog">
                        <CardFormBudget :sellers="sellerStore.sellers" :budgetToEdit="budget" :mode="formBudgetMode"></CardFormBudget>
                    </q-dialog>
                </div>
            </div>

            <div class="col-lg-9 col-md-8 col-sm-12">
                <DataTableBudgets :budgets="budgetStore.budgets" @editBudget="editBudget($event)"></DataTableBudgets>
            </div>
        </div>
    </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useBudgetStore } from "src/stores/budget";
import { useSellerStore } from "src/stores/seller";
import DataTableBudgets from "/src/components/DataTableBudgets.vue";
import CardFormBudget from 'src/components/CardFormBudget.vue';
import CardFilters from "src/components/CardFilter.vue";

const budgetStore = useBudgetStore();
const sellerStore = useSellerStore();

const budget = ref(null);
const formBudgetMode = ref("");
const newBudgetDialog = ref(false);

const filter = (filter) => {
    budgetStore.filter = filter;
    budgetStore.filterBudgets(filter); 
}

const createBudget = () => {
    formBudgetMode.value = "Cadastrar";
    newBudgetDialog.value = true;
}

const editBudget = (budget1) => {
    budget.value = budget1;
    formBudgetMode.value = "Editar";
    newBudgetDialog.value = true;
}

onMounted(() =>{
    budgetStore.getBudgets();
    sellerStore.getActiveSellers();
});

</script>
  