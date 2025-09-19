import { renderOrderSummary } from "./orderSummary.js";
import { renderPaymentSummary } from "./paymentSummary.js";
//import '../data/backend-practice.js';
import { loadProducts } from "../data/products.js";

loadProducts( () => {
    renderOrderSummary();
    renderPaymentSummary();
} );