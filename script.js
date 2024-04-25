// Funciones esenciales del proceso a simular

// Función para mostrar un mensaje en el HTML
const mostrarMensaje = mensaje => {
    const resultados = document.getElementById("resultados");
    resultados.innerHTML += `<p>${mensaje}</p>`;
};

// Objeto para representar un videojuego
const videojuegos = [
    { titulo: "FIFA 2024", plataforma: "PlayStation 5", precio: 59.99 },
    { titulo: "Call of Duty: Warzone", plataforma: "Xbox Series X", precio: 49.99 },
    { titulo: "The Legend of Zelda: Breath of the Wild", plataforma: "Nintendo Switch", precio: 54.99 },
    { titulo: "Super Mario Odyssey", plataforma: "Nintendo Switch", precio: 49.99 },
    { titulo: "God of War", plataforma: "PlayStation 4", precio: 39.99 },
    { titulo: "Halo Infinite", plataforma: "Xbox Series X", precio: 59.99 },
];

// Función para mostrar los detalles de un videojuego
const mostrarDetallesJuego = juego => {
    mostrarMensaje("Detalles del juego:");
    mostrarMensaje(`Título: ${juego.titulo}`);
    mostrarMensaje(`Plataforma: ${juego.plataforma}`);
    mostrarMensaje(`Precio: ${juego.precio} USD`);
};

// Función para simular la compra de un videojuego
const comprarJuego = (juego, cantidad) => {
    const total = juego.precio * cantidad;
    mostrarMensaje(`Has comprado ${cantidad} copias de ${juego.titulo}`);
    mostrarMensaje(`Total a pagar: ${total.toFixed(2)} USD`);
};

// Función de orden superior I: Filtrar juegos por plataforma
const filtrarJuegosPorPlataforma = (juegos, plataforma) => juegos.filter(juego => juego.plataforma === plataforma);

// Función de orden superior II: Calcular el total de precios de juegos
const calcularTotalPrecios = juegos => juegos.reduce((total, juego) => total + juego.precio, 0);

// Simulación de la e-commerce de videojuegos
const simularECommerce = () => {
    mostrarMensaje("¡Bienvenido a nuestra tienda de videojuegos!");

    // Mostrar todas las opciones de videojuegos disponibles
    mostrarMensaje("\nVideojuegos disponibles:");
    videojuegos.forEach((juego, index) => mostrarMensaje(`${index + 1}. ${juego.titulo}`));

    // Permitir al usuario seleccionar un videojuego
    let opcion = parseInt(prompt("Ingrese el número del videojuego que desea comprar:"));
    while (isNaN(opcion) || opcion < 1 || opcion > videojuegos.length) {
        mostrarMensaje("Opción no válida. Por favor, ingrese el número correspondiente al videojuego que desea comprar:");
        opcion = parseInt(prompt("Ingrese el número del videojuego que desea comprar:"));
    }
    const juegoSeleccionado = videojuegos[opcion - 1];

    // Mostrar los detalles del videojuego seleccionado
    mostrarDetallesJuego(juegoSeleccionado);

    // Permitir al usuario ingresar la cantidad deseada
    let cantidad = parseInt(prompt("Ingrese la cantidad de copias que desea comprar:"));
    while (isNaN(cantidad) || cantidad <= 0) {
        mostrarMensaje("La cantidad ingresada no es válida. Por favor, ingrese un número mayor que cero:");
        cantidad = parseInt(prompt("Ingrese la cantidad de copias que desea comprar:"));
    }

    // Realizar la compra del videojuego seleccionado
    comprarJuego(juegoSeleccionado, cantidad);

    // Mostrar el total de precios de todos los juegos disponibles
    mostrarMensaje("\nTotal de precios de todos los juegos disponibles:");
    mostrarMensaje(`${calcularTotalPrecios(videojuegos).toFixed(2)} USD`);
};

// Ejecutar la simulación al cargar la página
simularECommerce();
