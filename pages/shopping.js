import { getProductShopping } from "../services/api.js";
const allProducts = await getProductShopping();
const shoppingButton = document.querySelector(".shopping-cart");
const shoppingModal = document.querySelector(".modal_shopping");
const cartItemsContainer = document.getElementById("cartItemList");
const checkaut = document.getElementById("checkaut");


shoppingButton.addEventListener("click", () => {
  if (shoppingModal.style.display === "block" && allProducts.length === 0 ) {
    cartItemsContainer.innerHTML = "<p>Your cart is empty.</p>";
    shoppingModal.style.display = "none";
    
  } else {
    shoppingModal.style.display = "block";
    allProducts.forEach((item) => {
      const span = document.createElement("span");
      span.textContent = `${item.name} - $${item.total} - cant. ${item.quantity}`; 
      cartItemsContainer.appendChild(span);
    });
    checkaut.classList.remove("hiden")
  } 
});
