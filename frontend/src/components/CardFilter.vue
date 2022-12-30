<template>
    <div class="q-pa-md">
        <q-card class="my-card">
            <q-card-section class="bg-red-14 text-white">
                <div class="text-h6 text-center">Filtrar orçamentos</div>
            </q-card-section>

            <q-separator />

            <q-card-section align="center">
                <div v-if="filterOn">
                    <p v-if="currentFilter.client"><b>Cliente: </b> {{ currentFilter.client }} </p>
                    <p v-if="currentFilter.seller"><b>Vendedor: </b> {{ currentSeller.name }} </p>
                    <p v-if="currentFilter.begin"><b>A partir de: </b> {{ currentFilter.begin }} </p>
                    <p v-if="currentFilter.end"><b>Até: </b> {{ currentFilter.end }} </p>
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
                            <q-input class="col-12 q-pa-md" name="client" v-model="filter.client" color="red-5" label="Cliente" outlined clearable/>
                        </div>

                        <div class="row justify-center">
                            <q-select class="col-12 q-pa-md" name="seller" v-model="filter.seller" emit-value map-options color="red-5" option-value="id" option-label="name" :options="sellers" label="Vendedor" outlined/>
                        </div>
                        
                        <div class="row justify-center">
                        <q-input class="col-6 q-pa-md" v-model="filter.begin" mask="date" :rules="['date']" outlined color="red-5">
                            <template v-slot:append>
                            <q-icon name="event" class="cursor-pointer">
                                <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                                <q-date v-model="filter.begin" color="red-5" minimal>
                                    <div class="row items-center justify-end">
                                    <q-btn v-close-popup label="OK" color="red-5" flat/>
                                    </div>
                                </q-date>
                                </q-popup-proxy>
                            </q-icon>
                            </template>
                        </q-input>

                        <q-input class="col-6 q-pa-md" v-model="filter.end" mask="date" :rules="['date']" outlined color="red-5">
                            <template v-slot:append>
                            <q-icon name="event" class="cursor-pointer">
                                <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                                <q-date v-model="filter.end" color="red-5" minimal>
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
    