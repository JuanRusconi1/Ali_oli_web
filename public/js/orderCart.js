window.addEventListener("load", function () {
    let botones = document.querySelectorAll(".div-tipo-entrega")
    let delivery = document.querySelector(".div-formulario-delivery")
    let takeAway = document.querySelector(".div-formulario-take-away")
    botones[0].addEventListener("click", () => {
        botones[0].classList.add("active")
        botones[1].classList.remove("active")
        delivery.style.display = "block"
        takeAway.style.display = "none"
    })
    botones[1].addEventListener("click", () => {
        botones[1].classList.add("active")
        botones[0].classList.remove("active")
        takeAway.style.display = "block"
        delivery.style.display = "none"
    })


    /*Funciones para Carrito */

    function vaciarCarrito() {
        localStorage.removeItem("carrito")
    }

    function calcularTotal(productos) {
        return productos.reduce((acum, producto) => acum += producto.precio * producto.cantidad, 0);
    }

    let itemCart = document.querySelector(".div-contenedor-item");
        
    //esto representa 1 item de la lista 
        /* <div class="div-item-lista">
              <div class="titulo-div">2x Hamburguesa Americana</div>
              <div class="div-lista-precio">
                <p>$1200</p>
                <button class="boton-eliminar">
                  <i class="fa-solid fa-trash"></i>
                </button>
              </div>
            </div > */
})