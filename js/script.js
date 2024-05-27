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

// Función para calcular el total del carrito
function calculateCartTotal() {
  return cartItems.reduce((total, item) => total + item.price, 0);
}

// Función para guardar el carrito en el localStorage
function saveCartToStorage() {
  localStorage.setItem('cart', JSON.stringify(cartItems));
}

// Función para agregar producto al carrito
function addToCart(productName, price, quantity = 1) {
  const productPrice = price * quantity;
  cartItems.push({ name: productName, price: productPrice });
  cartTotal += productPrice;
  updateCart();
  saveCartToStorage();
}

// Función para remover el producto del carrito
function removeFromCart(index) {
  const removedItem = cartItems.splice(index, 1)[0];
  cartTotal -= removedItem.price;
  updateCart();
  saveCartToStorage();
}

// Función para actualizar el carrito en el DOM
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

// Función para agregar producto
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

// Función para obtener el precio en base al producto seleccionado
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

// Función para limpiar el formulario despues de agregar el producto
function limpiarFormulario() {
  document.getElementById('productos').selectedIndex = 0;
  document.getElementById('cantidad').value = '';
  document.getElementById('error').textContent = '';
}

// Función para calcular el subtotal
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

// Función para agregar precio
function agregarPrecio() {
  calcularSubtotal();
}

// Ocultamos el pedido final y el formulario al inicio
document.getElementById("pedido-final").style.display = "none";
document.getElementById("form-cliente").style.display = "none";

// Función para agregar producto al pedido final
function agregarProducto() {
  // Obtenemos los valores de los campos
  var producto = document.getElementById("productos").value;
  var cantidad = document.getElementById("cantidad").value;
  var precio = document.getElementById("precio").value;
  var subtotal = document.getElementById("subtotal").value;

  // Creamos una fila nueva en la tabla del pedido final
  var fila = document.createElement("tr");
  fila.innerHTML = `
    <th scope="row">${document.querySelectorAll("#pedido-final tbody tr").length + 1}</th>
    <td>${getProductoNombre(producto)}</td>
    <td>${cantidad}</td>
    <td>${precio}</td>
    <td>${subtotal}</td>
    <td><span class="icono-eliminar" onclick="eliminarItem(${document.querySelectorAll("#pedido-final tbody tr").length})"><svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-trash" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"></path>
      <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"></path>
    </svg></span></td>
  `;
  document.getElementById("pedido-final").getElementsByTagName("tbody")[0].appendChild(fila);

  // Mostramos el pedido final y el formulario
  document.getElementById("pedido-final").style.display = "block";
  document.getElementById("form-cliente").style.display = "block";

  // Calculamos el total
  var total = 0;
  var filas = document.querySelectorAll("#pedido-final tbody tr");
  for (var i = 0; i < filas.length - 1; i++) {
    total += parseFloat(filas[i].cells[4].textContent);
  }
  document.querySelector("#pedido-final tbody tr:last-child td.monto").textContent = total.toFixed(2);
}

// Función para eliminar un item del pedido final
function eliminarItem(index) {
  document.querySelectorAll("#pedido-final tbody tr")[index].remove();
  var total = 0;
  var filas = document.querySelectorAll("#pedido-final tbody tr");
  for (var i = 0; i < filas.length - 1; i++) {
    total += parseFloat(filas[i].cells[4].textContent);
  }
  document.querySelector("#pedido-final tbody tr:last-child td.monto").textContent = total.toFixed(2);
}

// Función para obtener el nombre del producto según su valor
function getProductoNombre(valor) {
  var productos = document.getElementById("productos").options;
  for (var i = 0; i < productos.length; i++) {
    if (productos[i].value == valor) {
      return productos[i].text;
    }
  }
  return "";
}

// Función para finalizar la orden
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
  $("#error-cliente").html("");
  var mensaje = `Muchas gracias por tu compra ${$(
    "#name"
  ).val()}, estaremos enviando tu pedido a ${$(
    "#adress"
  ).val()} en los proximos minutos`;
  $("#detalle-pedido").html(mensaje);
  $("#modal-pedido").modal();
  $("#pedido-final").html("");
  $("#form-cliente").html("");
}