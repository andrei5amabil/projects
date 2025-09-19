
const cart = {
    cartItems: undefined,
    loadFromStorage() {
        this.cartItems = JSON.parse(localStorage.getItem('cart-oop'));
    
        if(!this.cartItems){
            this.cartItems = [
                {
                    productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
                    quantity: 2,
                    deliveryOptionId: '1'
                },
                {
                    productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
                    quantity: 1,
                    deliveryOptionId: '2'
                }
            ];
        }
    },

    saveToStorage() {
        localStorage.setItem('cart-oop', JSON.stringify(this.cartItems));
    },

    addToCart(productId) {
        let matchingItem;
    
            this.cartItems.forEach( (cartItem) => {
                if (productId === cartItem.productId){
                    matchingItem = cartItem;
                }
            } );
    
            let quant = Number(document.querySelector(`.js-quantity-selector-${productId}`).value);
    
            if(matchingItem){
                matchingItem.quantity += quant;
            } else {
                this.cartItems.push({
                    productId: productId,
                    quantity: quant,
                    deliveryOptionId: '1'
                });
            }
        this.saveToStorage();
    },

    removeFromCart(productId) {
        const newCart = [];
        this.cartItems.forEach( (cartItem) => {
            if(cartItem.productId != productId) {
                newCart.push(cartItem);
            }
        } );
    
        this.cartItems = newCart;
        this.saveToStorage();
    },

    updateDeliveryOption( productId, deliveryOptionId ){
        let matchingItem;
    
            this.cartItems.forEach( (cartItem) => {
                if (productId === cartItem.productId){
                    matchingItem = cartItem;
                }
            } );
        matchingItem.deliveryOptionId = deliveryOptionId;
    
        this.saveToStorage();
    }
};

cart.loadFromStorage();

export function updateCartQuantity() {
    let cartQuantity = 0;

    cart.forEach( (cartItem) => {
        cartQuantity += cartItem.quantity;
    } );

    document.querySelector('.js-cart-quantity').innerHTML = cartQuantity;
    return cartQuantity;
}
