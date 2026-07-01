import cart from "../data/cart.js";

function removeFromCart(productId) {
    const index = cart.findIndex(p => p.id === productId);
    if (index !== -1) {
        cart.splice(index, 1);
    }
}

export default removeFromCart;