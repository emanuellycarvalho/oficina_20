<template>
  <q-layout>
    <q-header>
      <q-bar class="bg-red-14">
        <q-icon name="laptop_chromebook" />
        <div>Oficina 2.0</div>

        <q-space />

          <q-btn dense flat disabled icon="minimize" />
          <q-btn dense flat disabled icon="crop_square" />
          <q-btn dense flat disabled icon="close" />
      </q-bar>

      <div class="bg-red-5 q-pa-sm q-pl-md row items-center">
        <q-tabs v-model="tab">
          <q-tab name="sellers" label="Vendedores" />
          <q-tab name="budgets" label="Orçamentos" />
        </q-tabs>
      </div>
      </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer reveal class="bg-red-14">
      <q-toolbar>
        <q-toolbar-title>Footer</q-toolbar-title>
      </q-toolbar>
    </q-footer>
  </q-layout>
</template>

<script>
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'MainLayout'
});
</script>
