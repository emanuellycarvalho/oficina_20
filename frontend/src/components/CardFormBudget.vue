<template>
    <q-card>
        <q-bar class="bg-primary">
            <div class="text-white">
                {{  props.mode }} orçamento
            </div>
            <q-space />
            <q-btn dense flat icon="close" v-close-popup color="secondary">
                <q-tooltip>Fechar</q-tooltip>
            </q-btn>
        </q-bar>

        <q-card-section>
            <q-form @submit="submitBudget()">
                <div class="row justify-center">
                    <q-input 
                        label="Cliente" 
                        hint="Nome e sobrenome" 
                        v-model="budget.client" 
                        name="client" 
                        class="col-6 q-pa-lg" 
                        color="secondary" 
                        autofocus 
                        outlined 
                        clearable
                        :rules="[val => !!val || 'Obrigatório']"
                    />
                    
                    <q-input 
                        label="Valor" 
                        v-model="budget.value" 
                        name="value"
                        prefix="$"
                        mask="#,##"
                        fill-mask="0"
                        class="col-6 q-pa-lg" 
                        color="primary"
                        outlined 
                        reverse-fill-mask
                        :rules="[
                            val => !!val || 'Obrigatório',
                            val => parseFloat(val) > 0 || 'O valor precisa ser maior que zero'
                        ]"
                    />
                </div>

                <div class="row justify-center">
                    <q-select 
                        label="Vendedor" 
                        v-model="budget.seller_id" 
                        name="seller" 
                        option-value="id" 
                        option-label="name" 
                        :options="sellers" 
                        class="col-12 q-pa-lg" 
                        color="primary" 
                        emit-value 
                        map-options 
                        outlined
                        :rules="[val => !!val || 'Obrigatório']"
                    > 

                        <template v-slot:after>
                            <q-btn round dense flat icon="add" text-color="white" class="bg-primary"/>
                        </template>
                    </q-select>
                </div>
                
                <div class="row justify-center">
                    <q-input
                        label="Descrição"
                        v-model="budget.description"
                        type="textarea"
                        color="secondary"
                        class="col-12 q-pa-lg" 
                        outlined
                        :rules="[val => !!val || 'Obrigatório']"
                    />
                </div>

                <div class="row justify-end q-mt-xl">
                    <q-btn label="Salvar" type="submit" color="secondary"/>
                    <q-btn label="Limpar" @click.prevent.stop="resetForm()" color="secondary" flat class="q-ml-sm" />
                </div>
            </q-form>
        </q-card-section>
    </q-card>
</template>

<script setup>
import { reuse } from "boot/reuse";
import { ref, onMounted } from 'vue';
import { useBudgetStore } from "src/stores/budget";

const budgetStore = useBudgetStore();
const newBudgetDialog = ref(false);
const budget = ref({
    id: null,
    client: "",
    description: "",
    value: null,
    seller_id: null
});

const resetForm = () => {
    budget.value = {
        id: null,
        client: "",
        description: "",
        value: null,
        seller_id: null
    }
}

const submitBudget = () => {
    if(props.mode == "Cadastrar")
        budgetStore.create(budget.value);
    else
        budgetStore.update(budget.value);
    
    newBudgetDialog.value = false;
}

const props = defineProps({
    mode: String,
    sellers: Array,
    budgetToEdit: Object,
});

onMounted(() =>{
    if(props.budgetToEdit){
        budget.value = props.budgetToEdit;
        budget.value.value = reuse.currencyToFloatFormatter(props.budgetToEdit.value);
    }
});

</script>
    