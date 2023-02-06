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
    function setCarritoVacio() {
        listCart.innerHTML = `<div class="titulo-div">No tienes productos en tu carrito</div>`
    }

    function vaciarCarrito() {
        localStorage.removeItem("carrito")
    }

    function calcularTotal(productos) {
        return productos.reduce((acum, producto) => acum += producto.precio * producto.cantidad, 0);
    }
    
    let listCart = document.querySelector(".div-contenedor-item");
    let carrito = JSON.parse(localStorage.carrito)
    if (localStorage.carrito.length > 0) {
        let productos = []
        carrito.forEach((item, i) => {
            fetch(`/api/products/${item.id}`)
                .then(response => response.json())
                .then(product => {
                    if (product.data) {
                        listCart.innerHTML +=
                            `<div class="div-item-lista">
                                <div class="titulo-div">${item.cantidad}x ${product.data.name}</div>
                                <div class="div-lista-precio">
                                <p>$${product.data.price}</p>
                                <button class="boton-eliminar" data-id="${i}">
                                <i class="fa-solid fa-trash"></i>
                             </button>
                            </div>
                        </div >`
                        productos.push({ precio: product.data.price, cantidad: item.cantidad })
                    } else {
                        carrito.splice(i, 1)
                        localStorage.setItem("carrito", JSON.stringify(carrito))
                    }
                }).then(() => {
                    document.querySelector(".p-valor").innerText = `$${calcularTotal(productos)}`
                    
                    let botonesEmiminar = document.querySelectorAll(".boton-eliminar")
                    let itemsLista = document.querySelectorAll(".div-item-lista")
                    /*Funcionalidad para eliminar un item del carrito */
                    botonesEmiminar.forEach((boton, i) => {
                        boton.addEventListener("click", (e) => {
                            carrito.splice(i, 1)
                            localStorage.setItem("carrito", JSON.stringify(carrito))
                            itemsLista[i].style.display = "none"
                        })
                    })
                })
        });
    } else {
        setCarritoVacio()
    }
})