import { getProducts } from "../services/api.js";
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
        </a>
        `;
      card.innerHTML += template;
    }
  });
}

listProducts(currentCollection);
