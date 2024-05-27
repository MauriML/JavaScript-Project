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
let cartItems = JSON.parse(localStorage.getItem('cart')) || [];
let cartTotal = calculateCartTotal();

// Function to calculate the total of the cart
function calculateCartTotal() {
  return cartItems.reduce((total, item) => total + item.price, 0);
}

// Function to save the cart to localStorage
function saveCartToStorage() {
  localStorage.setItem('cart', JSON.stringify(cartItems));
}

// Function to add a product to the cart
function addToCart(productName, price, quantity = 1) {
  const productPrice = price * quantity;
  cartItems.push({ name: productName, price: productPrice });
  cartTotal += productPrice;
  updateCart();
  saveCartToStorage();
}

// Function to remove a product from the cart
function removeFromCart(index) {
  const removedItem = cartItems.splice(index, 1)[0];
  cartTotal -= removedItem.price;
  updateCart();
  saveCartToStorage();
}

// Function to update the cart display in the DOM
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

  document.getElementById('cart-total').textContent = `Total: ${cartTotal} ARS`;
}

// Function to add product from the form
function agregarProducto() {
  var cantidad = parseInt($("#cantidad").val());
  if (cantidad > 0) {
    $("#error").html("");
    var itemId = parseInt($("#productos").val());

    var indiceYaExiste = pedido.items.findIndex((item) => {
      return item.itemId == itemId;
    });
    if (indiceYaExiste == -1) {
      pedido.items.push({ itemId, cantidad });
    } else {
      pedido.items[indiceYaExiste].cantidad += cantidad;
    }
    $("#cantidad").val("");
    $("#subtotal").val("");
    dibujarPedido();
  } else {
    $("#error").html("Debe ingresar cantidad");
  }
}

// Function to get the price based on the selected product
function obtenerPrecio(productName) {
  const priceMap = {
    '1': 30000, // Prince of Persia
    '2': 400000, // PlayStation 4
    '3': 25000, // FIFA 2024
    '4': 500000, // PlayStation 5
    '5': 40000, // NBA 2K24
    '6': 35000, // Dead Island 2
    '7': 25000, // Spider Man Miles Morales
    '8': 35000, // God of War Ragnarok
    '9': 55000, // Lego Star Wars The Skywalker Saga
    '10': 45000, // Helldivers 2
  };

  return priceMap[productName] || 0;
}

// Function to clear the form after adding a product
function limpiarFormulario() {
  document.getElementById('productos').selectedIndex = 0;
  document.getElementById('cantidad').value = '';
  document.getElementById('error').textContent = '';
}

// Function to calculate the subtotal
function calcularSubtotal() {
  const productName = document.getElementById('productos').value;
  const price = obtenerPrecio(productName);
  const quantity = parseInt(document.getElementById('cantidad').value);

  if (isNaN(quantity) || quantity <= 0) {
    document.getElementById('error').textContent = 'Ingrese una cantidad válida.';
    return;
  }

  document.getElementById('precio').value = price;
  document.getElementById('subtotal').value = price * quantity;
}

// Function to add price
function agregarPrecio() {
  calcularSubtotal();
}

// Function to finalize the order
function finalizarPedido() {
  if ($("#name").val().trim() === "") {
    $("#error-cliente").html("Debe ingresar un nombre");
    return;
  }
  if ($("#phone").val().trim() === "") {
    $("#error-cliente").html("Debe ingresar un teléfono");
    return;
  }
  if ($("#adress").val().trim() === "") {
    $("#error-cliente").html("Debe ingresar una dirección");
    return;
  }

  $("#detalle-pedido").html(`Muchas gracias por tu compra ${$("#name").val()}, estaremos enviando tu pedido a ${$("#adress").val()} en los próximos minutos`);
  $("#modal-pedido").modal();
  $("#pedido-final").html("");
  $("#form-cliente").html("");
}