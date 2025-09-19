import { renderOrderSummary } from "./orderSummary.js";
import { renderPaymentSummary } from "./paymentSummary.js";
//import '../data/backend-practice.js';
import { loadProducts, loadProductsFetch } from "../data/products.js";

async function loadPage() {
    await loadProductsFetch();

    renderOrderSummary();
    renderPaymentSummary();

}

loadPage();

/*
new Promise( (resolve) => {
    loadProductsFetch().then( () => {
        renderOrderSummary();
        renderPaymentSummary();
    } );
    resolve();
} );
 */
