<template>
    <q-page class="flex flex-center">
        <DataTableConteudos :sellers="sellers"></DataTableConteudos>
    </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useSellerStore } from "src/stores/seller";
import DataTableConteudos from "/src/components/DataTableSellers.vue"

const sellerStore = useSellerStore();
const sellers = ref(null);

onMounted(() =>{
    sellers.value = sellerStore.getActiveSellers();
})

</script>
  