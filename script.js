let cart = JSON.parse(localStorage.getItem("cart")) || [];
let totalPrice = parseFloat(localStorage.getItem("totalPrice")) || 0;

const addToCartBtns = document.querySelectorAll(".add-to-card");
const cartItems = document.getElementById("cart-items");
const totalPriceElement = document.getElementById("total-price");
const buyBtn = document.getElementById("buy-btn");

addToCartBtns.forEach((button) => {
  button.addEventListener("click", () => {
    const productName = button.getAttribute("data-name");
    const productPrice = parseFloat(button.getAttribute("data-price"));

    const existingProduct = cart.find((item) => item.name === productName);

    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      cart.push({
        name: productName,
        price: productPrice,
        quantity: 1,
      });
    }

    totalPrice += productPrice;

    localStorage.setItem("cart", JSON.stringify(cart));
    localStorage.setItem("totalPrice", totalPrice.toFixed(2));

    updateCartDisplay();
  });
});

const updateCartDisplay = () => {
  cartItems.innerHTML = "";

  cart.forEach((item, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
            ${item.name} - $${item.price} x ${item.quantity} 
            <button class="remove-btn" data-index="${index}">Remove</button>
        `;
    cartItems.appendChild(li);
  });

  totalPriceElement.textContent = totalPrice.toFixed(2);

  document.querySelectorAll(".remove-btn").forEach((button) => {
    button.addEventListener("click", (e) => {
      const index = e.target.getAttribute("data-index");
      const item = cart[index];

      totalPrice -= item.price * item.quantity;
      cart.splice(index, 1);

      localStorage.setItem("cart", JSON.stringify(cart));
      localStorage.setItem("totalPrice", totalPrice.toFixed(2));

      updateCartDisplay();
    });
  });
};

// "Buy Now" Button
buyBtn.addEventListener("click", () => {
  if (cart.length > 0) {
    alert("Thank you for your purchase!");
    cart = [];
    totalPrice = 0;
    localStorage.removeItem("cart");
    localStorage.removeItem("totalPrice");
    updateCartDisplay();
  } else {
    alert("Your cart is empty!");
  }
});

// Initialize cart display on page load
updateCartDisplay();
