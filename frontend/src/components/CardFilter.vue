<template>
    <div class="q-pa-md">
        <q-card class="my-card">
            <q-card-section class="bg-red-14 text-white">
                <div class="text-h6 text-center">FILTRAR ORÇAMENTOS</div>
            </q-card-section>

            <q-separator />

            <q-card-section align="center">
                <div v-if="filterOn">
                    <p v-if="currentFilter.client"><b>Cliente: </b> {{ currentFilter.client }} </p>
                    <p v-if="currentFilter.seller"><b>Vendedor: </b> {{ currentSeller.name }} </p>
                    <p v-if="currentFilter.begin"><b>A partir de: </b> {{ reuse.dateFormatter(currentFilter.begin, "DD/MM/YYYY") }} </p>
                    <p v-if="currentFilter.end"><b>Até: </b> {{ reuse.dateFormatter(currentFilter.end, "DD/MM/YYYY") }} </p>
                </div>
                <div v-else>
                    <p>
                        <b>Nenhum filtro selecionado.</b>
                        <br>
                        Clique no botão abaixo para filtrar os resultados.
                    </p>
                </div>
            </q-card-section>

            <q-card-actions align="center" class="row">
                <q-btn
                    icon="filter_alt"
                    label="Fitrar"
                    @click="filterDialog = true"
                    class="q-ml-md bg-red-5 col-5"
                    text-color="white"
                />
                <q-btn 
                    v-if="filterOn"
                    flat
                    label="Remover" 
                    @click.prevent.stop="() => { resetFilter(); $emit('filter', filter); }" 
                    class="q-ml-sm col-5" 
                    color="red-5"  
                />                
            </q-card-actions>
        </q-card>

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
                            <q-input 
                                label="Cliente" 
                                v-model="filter.client" 
                                name="client" 
                                class="col-12 q-pa-md" 
                                color="red-5" 
                                outlined 
                                clearable
                            />
                        </div>

                        <div class="row justify-center">
                            <q-select 
                                label="Vendedor" 
                                v-model="filter.seller" 
                                name="seller" 
                                option-value="id" 
                                option-label="name" 
                                :options="sellers" 
                                class="col-12 q-pa-md" 
                                color="red-5" 
                                emit-value 
                                map-options 
                                outlined
                            />
                        </div>
                        
                        <div class="row justify-center">
                            <q-input 
                                label="Data de início"
                                v-model="filter.begin" 
                                type="date" 
                                mask="date" 
                                color="red-5"
                                class="col-6 q-pa-md" 
                                :rules="['date']" 
                                stack-label 
                                outlined 
                            />

                            <q-input 
                                label="Data de fim"
                                v-model="filter.end" 
                                type="date" 
                                mask="date" 
                                color="red-5"
                                class="col-6 q-pa-md" 
                                :rules="['date']" 
                                stack-label 
                                outlined 
                            />
                        </div>

                        <div class="row justify-end q-mt-xl">
                            <q-btn label="Filtrar" @click="() => {$emit('filter', filter); filterDialog = false; filterOn = true;}" color="red-5"/>
                            <q-btn label="Limpar" @click.prevent.stop="resetFilter()" color="red-5" flat class="q-ml-sm" />
                        </div>
                    </q-form>
                </q-card-section>
            </q-card>
        </q-dialog>
    </div>
</template>

<script setup>
import { useSellerStore } from "src/stores/seller";
import { ref, onMounted } from 'vue';
import { reuse } from "boot/reuse";
const emits = ['filter']

const sellerStore = useSellerStore();
const filterDialog = ref(false);
const filterOn = ref(false);
const currentSeller = ref("");
const filter = ref({
    client: "",
    seller: "",
    begin: null,
    end: null
});

const resetFilter = () => {
  filter.value = {
    client: "",
    seller: "",
    begin: null,
    end: null
  }

  filterOn.value = false;
}

const props = defineProps({
    currentFilter: Object,
    sellers: Array,
});

onMounted(() =>{
    if(props.currentFilter.client != "" || props.currentFilter.seller != "" || props.currentFilter.begin != null || props.currentFilter.end != null){
        filterOn.value = true;
    }

    if(props.currentFilter.seller){
        currentSeller.value = sellerStore.sellers.find(function(seller, index){
            if(seller.id == props.currentFilter.seller){
                return true;
            }
        });
    }
});

</script>
    