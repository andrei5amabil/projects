export const cart = [];

export function addToCart(productId) {
    let matchingItem;

        cart.forEach( (cartItem) => {
            if (productId === cartItem.productId){
                matchingItem = cartItem;
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
}

export function updateCartQuantity() {
    let cartQuantity = 0;

    cart.forEach( (cartItem) => {
        cartQuantity += cartItem.quantity;
    } );

    console.log(cart);
    console.log(cartQuantity);
    document.querySelector('.js-cart-quantity').innerHTML = cartQuantity;
}