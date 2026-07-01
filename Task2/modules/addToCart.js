import cart from "../data/cart.js";
import products from "../data/products.js";

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        cart.push(product);
    }
}

export default addToCart;