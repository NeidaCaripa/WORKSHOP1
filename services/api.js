const URL = "http://localhost:3000";

export async function getProducts() {
  const response = await fetch(`${URL}/productos`);
  const data = await response.json();
  return data;
}

export async function getProductShopping() {
  const response = await fetch(`${URL}/shopping`);
  const data = await response.json();
  return data;
}