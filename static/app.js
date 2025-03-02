import { faker } from "https://cdn.skypack.dev/@faker-js/faker";

const products = [];
const clients = [];
const sales = [];

/**
 * Displays all sales in the sales table
 * 
 * This function is called whenever the sales array changes. It clears the
 * innerHTML of the table body and then appends a row for each sale
 * in the sales array. Each row contains the product brand, type, price,
 * client name, quantity, total price, and a delete button.
 */
function displaySales() {
  const tableBody = document.getElementById("sales-table-body");
  if (!tableBody) return;
  tableBody.innerHTML = "";
  sales.forEach((sale) => {
    const product = products.find((p) => p.id == sale.product_id);
    const client = clients.find((c) => c.id == sale.client_id);
    const row = `<tr>
        <td>${product.brand} - ${product.type} - $${product.price}</td>
        <td>${client.name}</td>
        <td>${sale.quantity}</td>
        <td>${sale.total_price}</td>
        <td><button onclick="deleteSale(${sale.id})" class="button is-danger">Delete</button></td>
    </tr>`;
    tableBody.innerHTML += row;
  });
}

/**
 * Displays all products in the products table
 * 
 * This function is called whenever the products array changes. It clears the
 * innerHTML of the table body and then appends a row for each product
 * in the products array. Each row contains the product brand, type, origin,
 * price, and a delete button.
 */

function displayProducts() {
  const tableBody = document.getElementById("products-table-body");
  if (!tableBody) return;
  tableBody.innerHTML = "";
  products.forEach((product) => {
    const row = `<tr>
                <td>${product.brand}</td>
                <td>${product.type}</td>
                <td>${product.origin}</td>
                <td>${product.price}</td>
                <td><button onclick="deleteProduct(${product.id})" class="button is-danger">Delete</button></td>
            </tr>`;
    tableBody.innerHTML += row;
  });
}

/**
 * Displays all clients in the clients table
 * 
 * This function is called whenever the clients array changes. It clears the
 * innerHTML of the table body and then appends a row for each client
 * in the clients array. Each row contains the client name, RUT, location,
 * and a delete button.
 */

function displayClients() {
  const tableBody = document.getElementById("clients-table-body");
  if (!tableBody) return;
  tableBody.innerHTML = "";
  clients.forEach((client) => {
    const row = `<tr>
        <td>${client.name}</td>
        <td>${client.rut}</td>
        <td>${client.location}</td>
        <td><button onclick="deleteClient(${client.id})" class="button is-danger">Delete</button></td>
    </tr>`;
    tableBody.innerHTML += row;
  });
}

/**
 * Adds a new product to the products array
 * 
 * @param {string} brand The product brand
 * @param {string} type The product type
 * @param {string} origin The product origin
 * @param {number} price The product price
 */

function addProduct(brand, type, origin, price) {
  const id = products.length + 1;
  products.push({ id, brand, type, origin, price });
  displayProducts();
  populateProductDropdown();
}

/**
 * Adds a new client to the clients array
 * 
 * @param {string} name The client's name
 * @param {string} rut The client's RUT
 * @param {string} location The client's location
 */

function addClient(name, rut, location) {
  const id = clients.length + 1;
  clients.push({ id, name, rut, location });
  displayClients();
  populateClientDropdown();
}

/**
 * Adds a new sale to the sales array
 * 
 * @param {number} product_id The id of the product being sold
 * @param {number} client_id The id of the client buying the product
 * @param {number} quantity The quantity of the product being sold
 */
function addSale(product_id, client_id, quantity) {
  const id = sales.length + 1;
  const product = products.find((p) => p.id == product_id);
  const total_price = Math.round(product.price * quantity);
  sales.push({ id, product_id, client_id, quantity, total_price });
  displaySales();
}

/**
 * Deletes a product from the products array
 * 
 * @param {number} id The id of the product to delete
 */
function deleteProduct(id) {
  const index = products.findIndex((p) => p.id == id);
  if (index > -1) {
    products.splice(index, 1);
    displayProducts();
    populateProductDropdown();
  }
}

/**
 * Deletes a client from the clients array
 * 
 * @param {number} id The id of the client to delete
 */
function deleteClient(id) {
  const index = clients.findIndex((c) => c.id == id);
  if (index > -1) {
    clients.splice(index, 1);
    displayClients();
    populateClientDropdown();
  }
}

/**
 * Deletes a sale from the sales array
 * 
 * @param {number} id The id of the sale to delete
 */
function deleteSale(id) {
  const index = sales.findIndex((s) => s.id == id);
  if (index > -1) {
    sales.splice(index, 1);
    displaySales();
  }
}

/**
 * Populates the product dropdown with the products in the products array
 *
 * This function is called whenever the products array changes. It clears the
 * innerHTML of the product dropdown and then appends an option for each product
 * in the products array. Each option value is the product id and the textContent
 * is the product brand, type, and price.
 */
function populateProductDropdown() {
  const productDropdown = document.querySelector('select[name="product_id"]');
  if (!productDropdown) return;
  productDropdown.innerHTML = "";
  products.forEach((product) => {
    const option = document.createElement("option");
    option.value = product.id;
    option.textContent = `${product.brand} - ${product.type} - $${product.price}`;
    productDropdown.appendChild(option);
  });
}

/**
 * Populates the client dropdown with the clients in the clients array
 *
 * This function is called whenever the clients array changes. It clears the
 * innerHTML of the client dropdown and then appends an option for each client
 * in the clients array. Each option value is the client id and the textContent
 * is the client name.
 */
function populateClientDropdown() {
  const clientDropdown = document.querySelector('select[name="client_id"]');
  if (!clientDropdown) return;
  clientDropdown.innerHTML = "";
  clients.forEach((client) => {
    const option = document.createElement("option");
    option.value = client.id;
    option.textContent = client.name;
    clientDropdown.appendChild(option);
  });
}

/**
 * Returns a random integer between 0 (inclusive) and the given maximum (exclusive)
 *
 * @param {number} max The maximum value (exclusive) to return
 * @returns {number} A random integer between 0 and max
 */
function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

/**
 * Generates a random fake RUT (Chilean tax ID) with a valid checksum digit
 *
 * @returns {string} A string in the format "XXXXXXXX-X" where X is a digit
 */
function getFakeRUT() {
  // Generate a random number between 1000000 and 99999999 (7-8 digits)
  const numero = Math.floor(1000000 + Math.random() * 90000000);

  // Calculate verification digit
  function calcularDV(rut) {
    let suma = 0;
    let multiplicador = 2;

    for (let i = rut.toString().length - 1; i >= 0; i--) {
      suma += parseInt(rut.toString()[i]) * multiplicador;
      multiplicador = multiplicador === 7 ? 2 : multiplicador + 1;
    }

    let dv = 11 - (suma % 11);
    if (dv === 11) return "0";
    if (dv === 10) return "K";
    return dv.toString();
  }

  const dv = calcularDV(numero);

  return `${numero}-${dv}`;
}

document.addEventListener("DOMContentLoaded", () => {
  // Populate tables with random data using Faker.js
  for (let i = 1; i <= 30; i++) {
    // Add random products
    addProduct(
      faker.commerce.productName(),
      faker.commerce.productMaterial(),
      faker.address.country(),
      parseFloat(faker.commerce.price())
    );
    // Add random clients
    addClient(faker.name.fullName(), getFakeRUT(), faker.address.city());
    // Add random sales
    addSale(i, i, getRandomInt(100));
  }

  // Handle add product form submission
  const addProductForm = document.getElementById("add-product-form");
  if (addProductForm) {
    addProductForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const brand = e.target.brand.value;
      const type = e.target.type.value;
      const origin = e.target.origin.value;
      const price = parseFloat(e.target.price.value);
      addProduct(brand, type, origin, price);
      e.target.reset();
    });
  }

  // Handle add client form submission
  const addClientForm = document.getElementById("add-client-form");
  if (addClientForm) {
    addClientForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = e.target.name.value;
      const rut = e.target.rut.value;
      const location = e.target.location.value;
      addClient(name, rut, location);
      e.target.reset();
    });
  }

  // Handle add sale form submission
  const addSaleForm = document.getElementById("add-sale-form");
  if (addSaleForm) {
    addSaleForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const product_id = parseInt(e.target.product_id.value);
      const client_id = parseInt(e.target.client_id.value);
      const quantity = parseInt(e.target.quantity.value);
      addSale(product_id, client_id, quantity);
      e.target.reset();
    });
  }

  // Display initial data and populate dropdowns
  displayProducts();
  displayClients();
  displaySales();
  populateProductDropdown();
  populateClientDropdown();
});

// Make delete functions globally accessible
window.deleteProduct = deleteProduct;
window.deleteClient = deleteClient;
window.deleteSale = deleteSale;
