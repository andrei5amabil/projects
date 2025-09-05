import {cart} from '../data/cart.js';
import { products } from '../data/products.js';

let productsHTML = '';

products.forEach((product) => {
    productsHTML += `
        <div class="product-container">
            <div class="product-image-container">
                <img class="product-image"
                src="${product.image}">
            </div>

            <div class="product-name limit-text-to-2-lines">
                ${product.name}
            </div>

            <div class="product-rating-container">
                <img class="product-rating-stars"
                src="images/ratings/rating-${product.rating.stars * 10}.png">
                <div class="product-rating-count link-primary">
                ${product.rating.count}
                </div>
            </div>

            <div class="product-price">
                $${(product.priceCents / 100).toFixed(2)}
            </div>

            <div class="product-quantity-container">
                <select class="js-quantity-selector-${product.id}">
                <option selected value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
                </select>
            </div>

            <div class="product-spacer"></div>

            <div class="visibility-false added-to-cart js-added-${product.id}">
                <img src="images/icons/checkmark.png">
                Added
            </div>

            <button class="add-to-cart-button button-primary js-add-to-cart" 
            data-product-id="${product.id}" >
                Add to Cart
            </button>
            </div>`;

    
});

const productsGrid = document.querySelector('.js-products-grid');
productsGrid.innerHTML = productsHTML;

let timers = {};

document.querySelectorAll('.js-add-to-cart').forEach( (button) => {
    button.addEventListener('click', () => {
        const productId = button.dataset.productId;

        let matchingItem;

        cart.forEach( (item) => {
            if (productId === item.productId){
                matchingItem = item;
            }
        } );

        let quant = Number(document.querySelector(`.js-quantity-selector-${productId}`).value);

        if(matchingItem){
            matchingItem.quantity += quant;
        } else {
            cart.push({
                productId: productId,
                quantity: quant
            });
        }

        let cartQuantity = 0;

        cart.forEach( (item) => {
            cartQuantity += item.quantity;
        } );

        console.log(cart);
        console.log(cartQuantity);
        document.querySelector('.js-cart-quantity').innerHTML = cartQuantity;

        const added = document.querySelector(`.js-added-${productId}`);

        const timerKey = `timer-${productId}`;

        clearTimeout(timers[timerKey]);

        added.classList.remove('visibility-false');
        added.classList.add('visibility-true');
        timers[timerKey] = setTimeout( () => {
            added.classList.remove('visibility-true');
            added.classList.add('visibility-false');
        }, 2000 );
    });

} );