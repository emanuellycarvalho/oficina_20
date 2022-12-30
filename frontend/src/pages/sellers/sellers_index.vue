<template>
    <q-page class="flex flex-center">
        <DataTableSellers :sellers="sellers"></DataTableSellers>
    </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useSellerStore } from "src/stores/seller";
import DataTableSellers from "/src/components/DataTableSellers.vue"

const sellerStore = useSellerStore();
const sellers = ref([]);

onMounted(() =>{
    sellerStore.getActiveSellers();
    sellers.value = sellerStore.sellers;
})

</script>
  