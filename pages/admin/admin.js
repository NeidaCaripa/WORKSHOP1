import { getProducts } from "./conexionapi.js";


const inputEmail = document.getElementById("email")
const inputPassword = document.getElementById("password")
const form = document.getElementById("formulario")

const usuarios= [
  {
    correo: "neida.caripa@gmail.com",
    contrasena: 628223
  },
  { 
    correo: "alejo.serna@gmail.com",
    contrasena: 123456
  }];


  form.addEventListener("submit", function (event) {
    event.preventDefault();
  
    const emailValue = inputEmail.value;
    const passwordValue = inputPassword.value;
  
    const usuarioEncontrado = usuarios.find(usuario => usuario.correo === emailValue 
      && usuario.contrasena.toString() === passwordValue);
  
    if (usuarioEncontrado) {
      listProducts(currentCollection);
      form.style.display = "none";
      alert("Inicio de sesión exitoso");
    } else {
      alert("Información incorrecta");
    }
  });
  
  


const card = document.querySelector(".shoes-container");

const url = window.location.search;
const collection = new URLSearchParams(url);
const currentCollection = collection.get("collection");

async function listProducts(collection) {
  const products = await getProducts();
  products.forEach((product) => {
    if (collection === null || product.coleccion === collection) {
      const template = `
        <a class="shoe-card" href="productDetail.html?id=${product.id}">
            <li>
                <img class="shoe-image" src="${product.imagen0}" alt="${product.nombre}" />
                <h2 class="shoe-name">${product.nombre}</h2>
                <p class="shoe-collection">${product.coleccion}</p>
                <p class="shoe-price">${product.precio} COP</p>
            </li>
            <span>Editar</span>
            <span>Eliminar</span>
        </a>
        `;
      card.innerHTML += template;
    }
  });
}



