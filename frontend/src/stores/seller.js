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
        create(seller){
            reuse.showLoading();
            api.post(`/sellers`, seller).then((response) => {
                reuse.hideLoading();
                reuse.defaultMessage("Vendedor cadastrado com sucesso", "positive");
                this.getActiveSellers();
            })
            .catch((error) => {
                reuse.hideLoading();
                reuse.defaultMessage("Houve um erro ao cadastrar o vendedor", "negative", error);
            });
        },

        getSellers() {
            reuse.showLoading();
            api.get(`/sellers`).then((response) => {
                this.sellers = response.data;
                reuse.hideLoading();
            })
            .catch((error) => {
                reuse.hideLoading();
                reuse.defaultMessage("Houve um erro ao carregar os vendedores", "negative", error);
            });
        },

        getActiveSellers() {
            reuse.showLoading();
            api.get(`/sellers/active`).then((response) => {
                this.sellers = response.data;
                reuse.hideLoading();
            })
            .catch((error) => {
                reuse.hideLoading();
                reuse.defaultMessage("Houve um erro ao carregar os vendedores", "negative", error);
            });
        },

        resetForm(){
            this.form = {
                id: null,
                name: "",
                phone: "",
                active: null
            }
        }
    },
});
