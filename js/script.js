fetch('https://sheetdb.io/api/v1/xq4b11ihpz688')
  .then(res => res.json())
  .then(data => {
    const contenedor = document.querySelector("#productos .row");
    const modales = [];

    const productos = data.map(r => ({
      ...r,
      precio: parseFloat(r.precio),
      descripcion: r.descripcion
        ? r.descripcion.split('|').map(d => d.trim())
        : []
    }));

    productos.forEach(r => {
      contenedor.innerHTML += `
        <div class="col-12 col-sm-6 col-lg-3" data-aos="zoom-in">
          <div class="card bg-black text-light border border-warning h-100">
            <img src="${r.imagen}" class="card-img-top" alt="${r.nombre}">
            <div class="card-body d-flex flex-column">
              <h5 class="card-title text-warning">${r.nombre}</h5>
              <ul>${r.descripcion.map(d => `<li>${d}</li>`).join("")}</ul>
              <p class="mt-2"><strong>Precio:</strong> $${r.precio}</p>
              <div class="mt-auto text-end">
                <button class="btn btn-warning btn-zoom" data-bs-toggle="modal" data-bs-target="#modal${r.id}">
                  Ver más
                </button>
              </div>
            </div>
          </div>
        </div>
      `;

      modales.push(`
        <div class="modal fade" id="modal${r.id}" tabindex="-1" aria-labelledby="modalLabel${r.id}" aria-hidden="true">
          <div class="modal-dialog">
            <div class="modal-content bg-dark text-light">
              <div class="modal-header">
                <h5 class="modal-title" id="modalLabel${r.id}">${r.nombre}</h5>
                <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
              </div>
              <div class="modal-body">
                <img src="${r.imagen}" alt="${r.nombre}" class="img-fluid mb-3">
                <ul>
                  ${r.descripcion.map(d => `<li>${d}</li>`).join("")}
                  <li>Precio $${r.precio}</li>
                </ul>
                <button class="btn btn-outline-warning mt-3 btn-add-cart"
                  data-id="${r.id}"
                  data-nombre="${r.nombre}"
                  data-precio="${r.precio}"
                  data-imagen="${r.imagen}">
                  <i class="fa-solid fa-cart-plus"></i> Agregar al carrito
                </button>
              </div>
            </div>
          </div>
        </div>
      `);
    });

    document.body.insertAdjacentHTML("beforeend", modales.join(""));
  });

function eliminarRemera(id) {
  console.log("Intentando borrar ID:", id);
  if (!confirm("¿Eliminar remera ID " + id + "?")) return;

  fetch(`${API_URL}/id/${id}`, {
    method: "DELETE"
  })
    .then(res => res.json())
    .then(data => {
      console.log("SheetDB DELETE respondió:", data);
      if (data.deleted && data.deleted > 0) {
        document.getElementById("jsonResultado").textContent = `🗑️ Remera ID ${id} eliminada`;
      } else {
        document.getElementById("jsonResultado").textContent = `⚠️ No se borró nada (ID: ${id})`;
      }
      cargarRemerasTabla();
    })
    .catch(err => {
      document.getElementById("jsonResultado").textContent = `❌ Error al eliminar: ${err}`;
    });
}