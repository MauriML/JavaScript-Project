// Navbar toggle

function showSidebar (){
    const sidebar = document.querySelector(".sidebar")
    sidebar.style.display = "flex"
}

function hideSidebar (){
    const sidebar = document.querySelector(".sidebar")
    sidebar.style.display = "none"
}

// Fin Navbar toggle

// Carusel

const btnleft = document.querySelector(".btn-left"),
    btnright =  document.querySelector(".btn-right"),
    slider = document.querySelector("#slider"),
    sliderSection = document.querySelectorAll(".slider-section");


btnleft.addEventListener("click", e => moveToLeft())
btnright.addEventListener("click", e => moveToRight())

setInterval(() => {
    moveToRight()
}, 3000);

let operacion = 0,
    counter = 0,
    widthSvg = 100 / sliderSection.length;

function moveToRight() {
    if (counter >= sliderSection.length-1) {
        counter = 0;
        operacion = 0;
        slider.style.transform = `translate(-${operacion}%)`;
        slider.style.transition="none";
        return;
    }
    counter++;
    operacion = operacion + widthSvg;
    slider.style.transform = `translate(-${operacion}%)`;
    slider.style.transition = "all ease .6s"
}

function moveToLeft() {
    counter--;
    if (counter < 0) {
        counter = sliderSection.length-1;
        operacion = widthSvg * (sliderSection.length-1)
        slider.style.transform = `translate(-${operacion}%)`;
        slider.style.transition="none";
        return;
    }
    operacion = operacion - widthSvg;
    slider.style.transform = `translate(-${operacion}%)`;
    slider.style.transition = "all ease .6s"
}
// Fin Carusel

// Play Station Section

// Initialize an empty array for cartItems and cartTotal
let cartItems = JSON.parse(localStorage.getItem('cart')) || [];
let cartTotal = 0;

// Función para calcular el total del carrito
function calculateCartTotal() {
  return cartItems.reduce((total, item) => total + item.price, 0);
}

// Función para guardar el carrito en localStorage
function saveCartToStorage() {
  localStorage.setItem('cart', JSON.stringify(cartItems));
}

// Función para agregar un producto al carrito
function addToCart(productName, price, quantity = 1) {
  const productPrice = price * quantity;
  cartItems.push({ name: productName, price: productPrice });
  cartTotal += productPrice;
  updateCart();
  saveCartToStorage();
}

// Función para quitar un producto del carrito
function removeFromCart(index) {
  const removedItem = cartItems.splice(index, 1)[0];
  cartTotal -= removedItem.price;
  updateCart();
  saveCartToStorage();
}

// Función para actualizar la visualización del carrito en el DOM
function updateCart() {
  const cartList = document.getElementById('cart-items');
  cartList.innerHTML = '';

  cartItems.forEach((item, index) => {
    const listItem = document.createElement('li');
    listItem.textContent = `${item.name} - ${item.price} ARS`;
    const removeButton = document.createElement('button');
    removeButton.textContent = 'Quitar';
    removeButton.onclick = () => removeFromCart(index);
    listItem.appendChild(removeButton);
    cartList.appendChild(listItem);
  });

  document.getElementById('cart-total').textContent = cartTotal;

  // Actualizar el contador del carrito en la barra de navegación
  document.getElementById('cart-count').textContent = cartItems.length;
}

// Ejecutar la función updateCart al cargar la página para mostrar el carrito actual
window.addEventListener('load', updateCart);

// Función para agregar producto desde el formulario
function agregarProducto() {
  const productName = document.getElementById('productos').value;
  const price = obtenerPrecio(productName);
  const cantidad = parseInt(document.getElementById('cantidad').value);

  if (isNaN(cantidad) || cantidad <= 0) {
    document.getElementById('error').textContent = 'Ingrese una cantidad válida.';
    return;
  }

  addToCart(productName, price, cantidad);
  limpiarFormulario();
}

// Función para obtener el precio según el producto seleccionado
function obtenerPrecio(productName) {
  const priceMap = {
    '1': 30000, // Precio de Prince of Persia
    '2': 400000, // Precio de PlayStation 4
    '3': 25000, // Precio de FIFA 2024
    '4': 500000, // Precio de PlayStation 5
  };

  return priceMap[productName] || 0;
}

// Función para limpiar el formulario después de agregar un producto
function limpiarFormulario() {
  document.getElementById('productos').selectedIndex = 0;
  document.getElementById('cantidad').value = '';
  document.getElementById('error').textContent = '';
}