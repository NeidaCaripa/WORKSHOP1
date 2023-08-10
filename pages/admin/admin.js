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

  const showForm = () =>{
    addForm.style.display= "block"
  }

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
            <button class="btnEdit" type="button" name="${product.id}">Editar</button>
            <button class="btnDelete" name="${product.id}">Eliminar</button>
        </article>
        `;
      card.innerHTML += template;
    }
  });

  const btnEdit = document.getElementsByClassName('btnEdit');
  const btnDelete = document.getElementsByClassName('btnDelete');

  Array.from(btnEdit).forEach((element) => {
    element.addEventListener('click', (e) => {
    let id = e.target.getAttribute('name');
    console.log(id)
    editProducto(id)
    
    })
  });

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
      alert('Producto agreado:', response.data);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
    listProducts(currentCollection);
  }
  formAdd.addEventListener('submit', addProducto);
  
  
  btnNew.addEventListener('click', showForm);


  const editProducto = async ( id ) => { 
  
    try {
      showForm();
      const  response  = await axios.get(`${URL}/productos/${id}`);
      console.log(response)
    const productToEdit = response.data
      console.log("Zapato", productToEdit.nombre)
    
    
            nombreProducto.value = productToEdit.nombre;
            precioProducto.value = productToEdit.precio;
            tipoColleccion.value = productToEdit.coleccion;
            imagen0.value = productToEdit.imagen0;
            imagen1.value = productToEdit.imagen1;
            imagen2.value = productToEdit.imagen2;
            imagen3.value = productToEdit.imagen3;
            imagen4.value = productToEdit.imagen4;
  
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
          
              const putResponse = await axios.put(`${URL}/productos/${id}`, updatedData);
              console.log('Producto editado:', putResponse.data);
              console.log(response);
          
    
      // ... Resto de tu código de edición ...
  
      // nombreProducto = '';
      // precioProducto = '';
      // tipoColleccion = '';
      // imagen0.value = '';
      // imagen1.value = '';
      // imagen2.value = '';
      // imagen3.value = '';
      // imagen4.value = '';
    } catch (error) {
      console.log(error);
  }
  listProducts(currentCollection);

  };