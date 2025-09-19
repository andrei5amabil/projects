import { renderOrderSummary } from "./orderSummary.js";
import { renderPaymentSummary } from "./paymentSummary.js";
//import '../data/backend-practice.js';
import { loadProducts, loadProductsFetch } from "../data/products.js";


new Promise( (resolve) => {
    loadProductsFetch().then( () => {
        renderOrderSummary();
        renderPaymentSummary();
    } );
    resolve();
} );
