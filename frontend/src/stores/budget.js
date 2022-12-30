import { defineStore } from "pinia";
import { api } from "boot/axios";
import { reuse } from "boot/reuse";
import { useLocalStorage } from "@vueuse/core";

export const useBudgetStore = defineStore("budget", {
    state: () => ({
        budgets: useLocalStorage("budgets-store-budget", []),
        form: useLocalStorage("budgets-store-form", {
            id: null,
            client: "",
            description: "",
            value: null,
            seller_id: null,
            seller: {
                name: "",
                phone: "",
                active: null
            }
        }),
    }),

    getters: {
        item:
            ({ items }) =>
                (id) =>
                    items.find((item) => item.id === id),
    },

    actions: {
        getBudgets() {
            reuse.showLoading();
            api.get(`/budgets`).then((response) => {
                this.budgets = response.data;
                reuse.hideLoading();
                reuse.defaultMessage("Vendedores carregados com sucesso", "positive");
            });
        },
    },
});
