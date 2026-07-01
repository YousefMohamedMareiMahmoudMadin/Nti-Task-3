import cart from "../data/cart.js";

function calculateTotal() {
    return cart.reduce((total, item) => total + item.price, 0);
}

export default calculateTotal;