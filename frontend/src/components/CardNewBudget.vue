<template>
    <div class="q-pa-md">
        <q-btn label="Novo orçamento" size="lg" class="q-pa-md full-width" color="red-14" @click="newBudgetDialog = true"/>

        <q-dialog v-model="newBudgetDialog">
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
                            <q-input class="col-6 q-pa-lg" autofocus hint="Nome e sobrenome" name="client" v-model="budget.client" color="red-5" label="Cliente" outlined clearable/>
                            <q-input class="col-6 q-pa-lg" outlined v-model="number" type="number" label="Valor" color="red-14" prefix="$"/>
                        </div>

                        <div class="row justify-center">
                            <q-select 
                                class="col-12 q-pa-lg" 
                                name="seller" 
                                v-model="budget.seller" 
                                emit-value 
                                map-options 
                                color="red-5" 
                                option-value="id" 
                                option-label="name" 
                                :options="sellers" 
                                label="Vendedor" 
                                outlined
                            > 

                                <template v-slot:after>
                                    <q-btn round dense flat icon="add" text-color="white" class="bg-red-14"/>
                                </template>
                            </q-select>
                        </div>
                        
                        <div class="row justify-center">
                            <q-input
                                v-model="budget.description"
                                outlined
                                type="textarea"
                                label="Descrição"
                                color="red-5"
                                class="col-12 q-pa-lg" 
                            />
                        </div>

                        <div class="row justify-end q-mt-xl">
                            <q-btn label="Limpar" @click.prevent.stop="resetForm()" color="red-5" flat class="q-ml-sm" />
                        </div>
                    </q-form>
                </q-card-section>
            </q-card>
        </q-dialog>
    </div>
</template>

<script setup>
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

const props = defineProps({
    sellers: Array,
});

</script>
    