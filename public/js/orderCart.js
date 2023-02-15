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
        sessionStorage.removeItem("carrito")
    }

    function calcularTotal(productos) {
        return productos.reduce((acum, producto) => acum += producto.precio * producto.cantidad, 0);
    }

    let listCart = document.querySelector(".div-contenedor-item");
    if (sessionStorage.carrito) {
        let carrito = JSON.parse(sessionStorage.carrito)
        let adicionales = JSON.parse(sessionStorage.adicional)
        let productos = []
        let precioAdicionales = []
        let valorTotal = document.querySelector(".p-valor")
        carrito.forEach((item, i) => {
            fetch(`/api/products/${item.id}`)
                .then(response => response.json())
                .then(product => {
                    if (product.data) {
                        let id = product.data.id
                        console.log(id);
                        listCart.innerHTML +=
                            `<div class="div-item-lista">
                                <div class="titulo-div">${item.cantidad}x ${product.data.name}</div>
                                <div class="div-lista-precio">
                                <p>$${product.data.price}</p>
                                <button class="boton-eliminar" data-id="${i}">
                                <i class="fa-solid fa-trash"></i>
                             </button>
                            </div>
                            </div>
                            <div class="additionals"></div>`
                        productos.push({ precio: product.data.price, cantidad: item.cantidad })
                        let contenedorAdicionales = document.querySelectorAll(".additionals")
                        adicionales.forEach((adicional, i)=> {
                            if (adicional.id == id && adicional.detail.length > 0 ) {
                                let salsas = adicional.detail
                                salsas.forEach(salsa => {
                                    contenedorAdicionales[i].innerHTML += 
                                    `<div class="div-additional">
                                    <p class="titulo-additional">${salsa.name}</p>
                                    <p class="precio-additional">$${salsa.price}</p>
                                    </div>`
                                })
                            }
                        })
                        
                    } else {
                        carrito.splice(i, 1)
                        sessionStorage.setItem("carrito", JSON.stringify(carrito))
                    }
                }).then(() => {

                        valorTotal.innerText = `$${calcularTotal(productos)}`


                    let botonesEmiminar = document.querySelectorAll(".boton-eliminar")
                    let itemsLista = document.querySelectorAll(".div-item-lista")
                    /*Funcionalidad para eliminar un item del carrito */
                    botonesEmiminar.forEach((boton, i) => {
                        boton.addEventListener("click", (e) => {
                            carrito.splice(i, 1)
                            itemsLista[i].style.display = "none";
                            productos.splice(i, 1)
                            sessionStorage.setItem("carrito", JSON.stringify(carrito));
                            document.querySelector(".p-valor").innerText = `$${calcularTotal(productos)}`
                            if (carrito.length == 0) {
                                vaciarCarrito()
                                setCarritoVacio()
                                document.querySelector(".p-valor").innerText = "$0"
                            }
                        })
                    })

                })
        });
    } else {
        setCarritoVacio()
    }
})