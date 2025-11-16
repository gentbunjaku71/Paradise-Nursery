import { ADD_TO_CART, INCREASE_QTY, DECREASE_QTY, REMOVE_FROM_CART } from "./actions.js";

export function reducer(state = { cart: [] }, action) {
  switch (action.type) {
    case ADD_TO_CART:
      return {
        ...state,
        cart: [...state.cart, { ...action.product, qty: 1 }]
      };

    case INCREASE_QTY:
      return {
        ...state,
        cart: state.cart.map(p =>
          p.name === action.name ? { ...p, qty: p.qty + 1 } : p
        )
      };

    case DECREASE_QTY:
      return {
        ...state,
        cart: state.cart
          .map(p =>
            p.name === action.name ? { ...p, qty: p.qty - 1 } : p
          )
          .filter(p => p.qty > 0)
      };

    case REMOVE_FROM_CART:
      return {
        ...state,
        cart: state.cart.filter(p => p.name !== action.name)
      };

    default:
      return state;
  }
}
