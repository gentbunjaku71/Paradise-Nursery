import { createStore } from "./store.js";
import { reducer } from "./reducer.js";
import { addToCart, increaseQty, decreaseQty, removeFromCart } from "./actions.js";

export const store = createStore(reducer);

// Update cart count in header
store.subscribe(() => {
  const count = store.getState().cart.reduce((sum, i) => sum + i.qty, 0);
  document.querySelectorAll("#cart-count").forEach(el => (el.textContent = count));
});

// Add to cart button handler
export function addProduct(name, price, img, button) {
  const product = { name, price, img };
  store.dispatch(addToCart(product));

  // Disable button after click
  button.disabled = true;
  button.textContent = "Added!";
}

// Render shopping cart page
export function renderCart() {
  const cartDiv = document.getElementById("cart-container");
  const cart = store.getState().cart;

  let totalItems = 0;
  let totalCost = 0;

  cartDiv.innerHTML = "";

  cart.forEach(item => {
    totalItems += item.qty;
    totalCost += item.qty * item.price;

    cartDiv.innerHTML += `
      <div class="cart-item">
        <img src="${item.img}">
        <div>
          <h3>${item.name}</h3>
          <p>Unit Price: $${item.price.toFixed(2)}</p>
        </div>

        <div class="cart-controls">
          <button onclick="store.dispatch({type:'DECREASE_QTY', name:'${item.name}'}); renderCart();">-</button>
          <span>${item.qty}</span>
          <button onclick="store.dispatch({type:'INCREASE_QTY', name:'${item.name}'}); renderCart();">+</button>
        </div>

        <button onclick="store.dispatch({type:'REMOVE_FROM_CART', name:'${item.name}'}); renderCart();">Delete</button>
      </div>
    `;
  });

  document.getElementById("total-items").textContent = totalItems;
  document.getElementById("total-cost").textContent = totalCost.toFixed(2);
}
