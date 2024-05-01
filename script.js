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
// Array para almacenar los productos en el carrito
const cartItems = [];
let cartTotal = 0;

// Función para agregar un producto al carrito
function addToCart(productName, price) {
    cartItems.push({name: productName, price: price});
    cartTotal += price;
    updateCart();
}

// Función para quitar un producto del carrito
function removeFromCart(index) {
    const removedItem = cartItems.splice(index, 1)[0];
    cartTotal -= removedItem.price;
    updateCart();
}

// Función para actualizar la visualización del carrito
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
}