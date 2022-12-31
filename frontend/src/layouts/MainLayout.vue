<template>
  <q-layout>
    <q-header>
      <q-bar class="bg-primary">
        <q-icon name="directions_car"/>
        <div>Oficina 2.0</div>

        <q-space />

          <q-btn dense flat disabled icon="minimize" />
          <q-btn dense flat disabled icon="crop_square" />
          <q-btn dense flat disabled icon="close" />
      </q-bar>

      <div class="bg-secondary q-pa-sm q-pl-md row items-center">
        <q-tabs>
          <q-route-tab exact name="home" to="/" label="Home" />
          <q-route-tab exact name="sellers" to="/sellers" label="Vendedores" />
          <q-route-tab exact name="budgets" to="/budgets" label="Orçamentos" />
        </q-tabs>
      </div>
      </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>

  </q-layout>
</template>

<script>
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'MainLayout'
});
</script>
