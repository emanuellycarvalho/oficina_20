import { defineStore } from "pinia";
import { api } from "boot/axios";
import { reuse } from "boot/reuse";
import { useLocalStorage } from "@vueuse/core";

export const useSellerStore = defineStore("seller", {
    state: () => ({
        sellers: useLocalStorage("sellers-store-seller", []),
        form: useLocalStorage("sellers-store-form", {
            id: null,
            name: "",
            phone: "",
            active: null
        }),
    }),

    getters: {
        item:
            ({ items }) =>
                (id) =>
                    items.find((item) => item.id === id),
    },

    actions: {
        getSellers() {
            reuse.showLoading();
            api.get(`/sellers`).then((response) => {
                this.sellers = response.data;
                reuse.hideLoading();
                reuse.defaultMessage("Vendedores carregados com sucesso", "positive");
            });
        },

        getActiveSellers() {
            reuse.showLoading();
            api.get(`/sellers/active`).then((response) => {
                this.sellers = response.data;
                reuse.hideLoading();
                reuse.defaultMessage("Vendedores carregados com sucesso", "positive");
            });
        },
    },
});
