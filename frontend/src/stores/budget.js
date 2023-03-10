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
            seller: null,
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
        create(budget){
            reuse.showLoading();
            budget.value = reuse.currencyToFloatFormatter(budget.value);
            api.post(`/budgets`, budget).then((response) => {
                reuse.hideLoading();
                reuse.defaultMessage("Orçamento cadastrado com sucesso", "positive");
                this.router.go();
            })
            .catch((error) => {
                reuse.hideLoading();
                reuse.defaultMessage("Houve um erro ao cadastrar o orçamento", "negative", error);
            });
        },

        update(budget){
            reuse.showLoading();
            budget.value = reuse.currencyToFloatFormatter(budget.value);
            api.put(`/budgets/${budget.id}`, budget).then((response) => {
                reuse.hideLoading();
                reuse.defaultMessage("Orçamento atualizado com sucesso", "positive");
                this.router.go();
            })
            .catch((error) => {
                reuse.hideLoading() ;
                reuse.defaultMessage("Houve um erro ao atualizar o orçamento", "negative", error);
            });
        },

        destroy(budget_id){
            reuse.showLoading();
            api.delete(`/budgets/${budget_id}`).then((response) => {
                reuse.hideLoading();
                reuse.defaultMessage("Orçamento excluído com sucesso", "positive");
                this.router.go();
            })
            .catch((error) => {
                reuse.hideLoading();
                reuse.defaultMessage("Houve um erro ao excluir o orçamento", "negative", error);
            });
        },

        getBudgets() {
            reuse.showLoading();
            api.get(`/budgets`).then((response) => {
                this.budgets = reuse.floatToCurrencyArrayFormatter(response.data);
                reuse.hideLoading();
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
                this.budgets = reuse.floatToCurrencyArrayFormatter(response.data);
                reuse.defaultMessage("Orçamentos filtrados com sucesso", "positive");
                this.router.push({name: "budgets_index"});
            })
            .catch((error) => {
                reuse.hideLoading();
                reuse.defaultMessage("Houve um erro ao filtrar os orçamentos", "negative", error);
            });
        },

        resetForm(){
            this.form = {
                id: null,
                client: "",
                description: "",
                value: null,
                seller: null,
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
