import { renderOrderSummary } from "./orderSummary.js";
import { renderPaymentSummary } from "./paymentSummary.js";
//import '../data/backend-practice.js';
import { loadProducts, loadProductsFetch } from "../data/products.js";

async function loadPage() {

    try{
        await loadProductsFetch();

    renderOrderSummary();
    renderPaymentSummary();
    } catch (error) {
        console.log('unfortunate error');
    }

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
