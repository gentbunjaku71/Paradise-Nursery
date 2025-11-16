export const ADD_TO_CART = "ADD_TO_CART";
export const INCREASE_QTY = "INCREASE_QTY";
export const DECREASE_QTY = "DECREASE_QTY";
export const REMOVE_FROM_CART = "REMOVE_FROM_CART";

export function addToCart(product) {
  return { type: ADD_TO_CART, product };
}

export function increaseQty(name) {
  return { type: INCREASE_QTY, name };
}

export function decreaseQty(name) {
  return { type: DECREASE_QTY, name };
}

export function removeFromCart(name) {
  return { type: REMOVE_FROM_CART, name };
}
