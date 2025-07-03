// cart.js

document.addEventListener('DOMContentLoaded', () => {

  // Carrito de compras en memoria
  let carrito = [];

  // Función para agregar un producto al carrito
  function agregarAlCarrito(id, nombre, precio, imagen) {
    const existente = carrito.find(item => item.id === id);
    if (existente) {
      existente.cantidad++;
    } else {
      carrito.push({
        id,
        nombre,
        precio,
        imagen,
        cantidad: 1
      });
    }
    actualizarCarrito();
    mostrarAlertaAgregado();
  }

  // Actualiza el contador y el listado de productos en el modal
  function actualizarCarrito() {
    const lista = document.getElementById("carrito-items");
    const total = document.getElementById("carrito-total");
    const contador = document.getElementById("contador-carrito");

    lista.innerHTML = "";
    let totalCarrito = 0;
    let cantidadTotal = 0;

    carrito.forEach(item => {
      totalCarrito += item.precio * item.cantidad;
      cantidadTotal += item.cantidad;

      const li = document.createElement("li");
      li.className = "list-group-item bg-dark text-light d-flex justify-content-between align-items-center";

      li.innerHTML = `
        <div class="d-flex align-items-center">
          <img src="${item.imagen}" alt="${item.nombre}" width="50" class="me-2 border border-warning rounded">
          <div>
            <div>${item.nombre}</div>
            <small class="text-muted">Cantidad: ${item.cantidad}</small>
          </div>
        </div>
        <span>$${(item.precio * item.cantidad).toFixed(2)}</span>
      `;

      lista.appendChild(li);
    });

    total.textContent = totalCarrito.toFixed(2);
    contador.textContent = cantidadTotal;
  }

  // Mostrar alerta de producto agregado (asume que tienes un elemento con id alerta-agregado)
  function mostrarAlertaAgregado() {
    const alerta = document.getElementById("alerta-agregado");
    if (!alerta) return; // Si no existe, no hace nada

    alerta.classList.remove("d-none");
    alerta.classList.add("show");

    setTimeout(() => {
      alerta.classList.remove("show");
      alerta.classList.add("d-none");
    }, 2500);
  }

  // Finalizar compra
  function checkout() {
    if (carrito.length === 0) {
      alert("El carrito está vacío.");
      return;
    }

    alert("Gracias por tu compra. Pronto nos pondremos en contacto.");
    carrito = [];
    actualizarCarrito();
  }

  // Genera un resumen del carrito en texto plano para enviar por formulario
  function generarResumenCarrito() {
    if (carrito.length === 0) return "Carrito vacío.";

    return carrito.map(item => {
      return `🛒 ${item.nombre} - Cantidad: ${item.cantidad} - $${(item.precio * item.cantidad).toFixed(2)}`;
    }).join("\n");
  }

  // Agregar eventos a los botones "Agregar al carrito"
  document.querySelectorAll(".btn-add-cart").forEach(btn => {
    btn.addEventListener("click", () => {
      const id = btn.dataset.id;
      const nombre = btn.dataset.nombre;
      const precio = parseFloat(btn.dataset.precio);
      const imagen = btn.dataset.imagen;

      agregarAlCarrito(id, nombre, precio, imagen);
    });
  });

  // Evento para el botón de finalizar compra
  const btnCheckout = document.getElementById("btn-checkout");
  if (btnCheckout) {
    btnCheckout.addEventListener("click", checkout);
  }

  // Evento para el botón de cerrar el modal del carrito
  const btnCloseModal = document.getElementById("btn-close-modal");
  if (btnCloseModal) {
    btnCloseModal.addEventListener("click", () => {
      const modal = document.getElementById("carritoModal");
      if (modal) {
        modal.classList.remove("show");
        modal.style.display = "none";
      }
    });
  }

  // Cuando se envía el formulario de contacto, añadimos el resumen del carrito
  const formularioContacto = document.querySelector('form[action*="https://formspree.io/f/mnnpklkl"]');
  if (formularioContacto) {
    formularioContacto.addEventListener("submit", (e) => {
      const inputResumen = document.getElementById("carrito_resumen");
      if (inputResumen) {
        inputResumen.value = generarResumenCarrito();
      }
    });
  }

  // Inicializar el carrito visual al cargar la página
  actualizarCarrito();

});
// Fin del script de carrito.js         