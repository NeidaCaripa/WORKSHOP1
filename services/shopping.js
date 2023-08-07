import { getProductShopping } from "../services/api.js";
const allProducts = await getProductShopping();
const shoppingButton = document.querySelector(".shopping-cart");
const shoppingModal = document.querySelector(".modal_shopping");
const cartItemsContainer = document.getElementById("cartItemList");
const checkaut = document.getElementById("checkaut");
const form = document.getElementById("form");
const nombre = document.getElementById('nombre');
const cedula = document.getElementById('cedula');
const tarjetaDeCredito = document.getElementById('tarjetaDeCredito');



shoppingButton.addEventListener("click", () => {
  if (shoppingModal.style.display === "block" && allProducts.length === 0 ) {
    cartItemsContainer.innerHTML = "<p>Your cart is empty.</p>";
    shoppingModal.style.display = "none";
    
  } else {
    shoppingModal.style.display = "block";
    allProducts.forEach((item) => {
      const span = document.createElement("span");
      span.textContent = `${item.name} - $${item.total} - cant. ${item.quantity}
      `;
      cartItemsContainer.appendChild(span);
      const button = document.createElement("button");
      button.textContent = "X";
      cartItemsContainer.appendChild(button);
    });
    const eliminar = document.getElementById("eliminar");

    checkaut.classList.remove("hiden")
  }
});
const showForm = () =>{
  form.classList.remove("formulario-check")};
checkaut.addEventListener("click",showForm)


async function guardarUsuario() {
  const compra = {
    nombre: nombre.value,
    cedula: cedula.value,
    tarjetaDeCredito: tarjetaDeCredito.value,
    product: allProducts
  }
  // console.log(users);
    
  let resp = await fetch("http://localhost:3000/compraUsuario", {
          method: 'POST',
          body: JSON.stringify(compra),
          headers: {
              "Content-Type": "application/json; charset=UTF-8"
          }
      })
  
      // console.log(resp);
  
      let data = await resp.json()
      console.log(data);
}
const handleDelete = async (id) => {
  try {
      let response = await fetch("http://localhost:3000/shopping", {
          method: 'DELETE'
      });
      console.log(response);
  } catch (error) {
      console.log(error);
  }
}

botonFormulario.addEventListener('click', e => {
  e.preventDefault();
  guardarUsuario();
  handleDelete();
})

