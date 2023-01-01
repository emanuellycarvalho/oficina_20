import { boot } from "quasar/wrappers";
import { Notify, Loading, date } from "quasar";

const reuse = {
    defaultMessage(message, type = "secondary", error = "", time = 10000) {
        if (type == "negative" && error.response) {
            errorMessage = `<br/> ${error.response?.data?.message} <br/> Status ${error.response?.status} ${error.response?.statusText}`;
            message = `${message} ${errorMessage}`
        }

        Notify.create({
            message: message,
            color: type,
            textColor: "white",
            position: "bottom",
            icon: "cloud_done",
            timeout: time,
            html: true,
        });
    },

    showLoading: function () {
        return Loading.show();
    },

    hideLoading: function () {
        return Loading.hide();
    },

    dateFormatter(dateTime, format) {
        let dataTimestamp = +new Date(dateTime);
        return date.formatDate(dataTimestamp, format);
    },

    currencyToFloatFormatter(currency){
        let result = currency.replace('R$', ''); 
        result = result.replace('.', ''); 
        result = result.replace(',', '.');
        result = parseFloat(result);
        return result;
    }
};
export default boot(({ app }) => {
    // for use inside Vue files (Options API) through this.$axios and this.$api

    app.config.globalProperties.$reuse = reuse;
    // ^ ^ ^ this will allow you to use this.$api (for Vue Options API form)
    //       so you can easily perform requests against your app's API
});

export { reuse };
