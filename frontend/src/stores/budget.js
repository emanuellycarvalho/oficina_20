import { defineStore } from "pinia";
import { api } from "boot/axios";
import { reuse } from "boot/reuse";
import { useLocalStorage } from "@vueuse/core";

export const useBudgetStore = defineStore("budget", {
    state: () => ({
        budgets: useLocalStorage("budgets-store-budgets", []),
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

        filter: useLocalStorage("budgets-store-filter", {
            client: "",
            seller: "",
            begin: null,
            end: null
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
                reuse.defaultMessage("Orçamentos carregados com sucesso", "positive");
            })
            .catch((error) => {
                reuse.hideLoading();
                reuse.defaultMessage("Houve um erro ao carregar os orçamentos", "negative", error);
            });
        },

        filterBudgets(filter){
            reuse.showLoading();
            api.post(`/budgets/filter`, filter).then((response) => {
                reuse.hideLoading();
                this.budgets = response.data;
                reuse.defaultMessage("Orçamentos carregados com sucesso", "positive");
                this.router.push({name: "budgets_index"});
            })
            .catch((error) => {
                reuse.hideLoading();
                reuse.defaultMessage("Houve um erro ao carregar os orçamentos", "negative", error);
            });
        },

        resetForm(){
            this.form = {
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
            }
        },

        resetFilter(){
            this.filter = {
                client: "",
                seller: "",
                begin: null,
                end: null
            }
        }
    },
});
