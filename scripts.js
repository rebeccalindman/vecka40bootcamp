// Simple cart functionality
let cart = [];

function addToCart(product) {
    cart.push(product);
    alert(product + ' has been added to your cart.');
    console.log('Cart:', cart);
}
