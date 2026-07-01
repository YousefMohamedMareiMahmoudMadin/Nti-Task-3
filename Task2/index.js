import addToCart from "./modules/addToCart.js";
import removeFromCart from "./modules/removeFromCart.js";
import listCart from "./modules/listCart.js";
import calculateTotal from "./modules/calculateTotal.js";

addToCart(1);
addToCart(2);
addToCart(3);

console.log("Cart after adding items:", listCart());
console.log("Total price:", calculateTotal());

removeFromCart(2);

console.log("Cart after removing phone:", listCart());
console.log("New total price:", calculateTotal());