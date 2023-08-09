import { getProducts } from "./conexionapi.js";

const formAdd = document.getElementById("form")
const nombreProducto = document.getElementsByName('nombre')[0]; // Accedemos al primer elemento
const precioProducto = document.getElementsByName('precio')[0];
const tipoColleccion = document.getElementsByName('coleccion')[0];
const imagen0 = document.getElementsByName('imagen0')[0];
const imagen1 = document.getElementsByName('imagen1')[0];
const imagen2 = document.getElementsByName('imagen2')[0];
const imagen3 = document.getElementsByName('imagen3')[0];
const imagen4 = document.getElementsByName('imagen4')[0];
const addForm = document.getElementById('addForm')
const btnNew = document.getElementById('btnNew');


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
      btnNew.style.display= "block"
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
        <article class="shoe-card">
            <li>
                <img class="shoe-image" src="${product.imagen0}" alt="${product.nombre}" />
                <h2 class="shoe-name">${product.nombre}</h2>
                <p class="shoe-collection">${product.coleccion}</p>
                <p class="shoe-price">${product.precio} COP</p>
            </li>
            <button class="btnDelete" name="${product.id}">Eliminar</button>
        </article>
        `;
      card.innerHTML += template;
    }
  });

  const btnDelete = document.getElementsByClassName('btnDelete');

  Array.from(btnDelete).forEach((element) => {
    let id = element.getAttribute('name');
    element.addEventListener('click', () => {
      handleDelete(id);
    })
  });
}

const URL = 'http://localhost:3000';

const handleDelete = async (id) => {

  try {
    const response = await axios.delete(`${URL}/productos/${id}`);
    console.log('Producto eliminado:', response.data);
    console.log(response);
  } catch (error) {
    console.log(error);
  }
  getProducts();
}

const addProducto = async (e) => {
  e.preventDefault()
    const updatedData = {
      "nombre": nombreProducto.value,
      "precio": precioProducto.value,
      "coleccion": tipoColleccion.value,
      "imagen0": imagen0.value,
      "imagen1": imagen1.value,
      "imagen2": imagen2.value,
      "imagen3": imagen3.value,
      "imagen4": imagen4.value
    };
  
    try {
      const response = await axios.post(`${URL}/productos`, updatedData);
      console.log('Producto agreado:', response.data);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  
  }
  formAdd.addEventListener('submit', addProducto)
  
  const showForm = () =>{
    addForm.style.display= "block"
  }
  btnNew.addEventListener('click', showForm);