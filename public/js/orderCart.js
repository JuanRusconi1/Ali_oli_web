window.addEventListener("load", function () {
    let botones = document.querySelectorAll(".div-tipo-entrega")
    let delivery = document.querySelector(".div-formulario-delivery")
    let takeAway = document.querySelector(".div-formulario-take-away")
    botones[0].addEventListener("click", () => {
        botones[0].classList.add("active")
        botones[1].classList.remove("active")
        botones[0].dataset.active = 1
        botones[1].dataset.active = 0
        delivery.style.display = "block"
        takeAway.style.display = "none"
    })
    botones[1].addEventListener("click", () => {
        botones[1].classList.add("active")
        botones[0].classList.remove("active")
        botones[1].dataset.active = 1
        botones[0].dataset.active = 0
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
        return productos.reduce((acum, producto) => acum += producto.price * producto.cantidad, 0);
    }
    let totalAdicionales = (adicionales) => {
        let preciosTotales = []
        adicionales.forEach(salsa => {
            if (salsa.id != 42) {
                let salsas = salsa.detail
                salsas.forEach(salsa => {
                    preciosTotales.push({ price: salsa.price })
                })
            }
        })
        return preciosTotales.reduce((acum, salsa) => acum += salsa.price, 0);
    }
    let listCart = document.querySelector(".div-contenedor-item");

    if (sessionStorage.carrito) {
        let carrito = JSON.parse(sessionStorage.carrito)
        let adicionales = JSON.parse(sessionStorage.adicional)
        let valorTotal = document.querySelector(".p-valor")

        carrito.forEach(async (item, i) => {
            let id = item.id
            listCart.innerHTML +=
                `<div class="div-item-lista" >
                <div class="div-item">
                                  <div class="titulo-div">${item.cantidad}x ${item.name}</div>
                                  <div class="div-lista-precio">
                                  <p>$${item.price}</p>
                                  <button class="boton-eliminar" data-id="${item.id}">
                                  <i class="fa-solid fa-trash"></i>
                               </button>
                            </div>
                        </div>
                     <div class="additionals"></div>
                </div>`

            let contenedorAdicionales = document.querySelectorAll(".additionals");

            let contador = 0;
            adicionales.forEach((adicional) => {
                if (adicional.id == id && adicional.detail.length > 0) {
                    if (adicional.id == 42) {
                        contador++
                        if (contador == 1) {
                            let empanadas = adicionales[i].detail;
                            console.log(empanadas);
                            empanadas.forEach(salsa => {
                                contenedorAdicionales[i].innerHTML +=
                                    `<div class="div-additional" ">
                                                               <p class="titulo-additional">${salsa.cantidad}x ${salsa.name}</p>
                                                               </div>`

                            })
                        }
                    } else {
                        let salsas = adicional.detail
                        salsas.forEach(salsa => {
                            contenedorAdicionales[i].innerHTML +=
                                `<div class="div-additional" ">
                                                       <p class="titulo-additional">${salsa.name}</p>
                                                       <p class="precio-additional">$${salsa.price}</p>
                                                       </div>`
                        })
                    }
                }
            })
        });

        valorTotal.innerText = `$${calcularTotal(carrito) + totalAdicionales(adicionales)}`

        let botonesEmiminar = document.querySelectorAll(".boton-eliminar")
        let itemsLista = document.querySelectorAll(".div-item-lista")
        /*Funcionalidad para eliminar un item del carrito */
        botonesEmiminar.forEach((boton, i) => {
            boton.addEventListener("click", async (e) => {
                let id = boton.dataset.id
                carrito.forEach((producto, i) => {
                    if (producto.id == id) {
                        carrito.splice(i, 1)
                    }
                });
                adicionales.forEach((adicional, i) => {
                    if (adicional.id == id) {
                        adicionales.splice(i, 1)
                    }
                })
                itemsLista[i].style.display = "none";
                adicionales.forEach(async (salsa, i) => {
                    if (salsa.id == id) {
                        adicionales.splice(i, 1)
                    }
                })
                sessionStorage.setItem("adicional", JSON.stringify(adicionales))
                sessionStorage.setItem("carrito", JSON.stringify(carrito));
                console.log(adicionales);
                console.log(carrito);
                valorTotal.innerText = `$${calcularTotal(carrito) + totalAdicionales(adicionales)}`
                console.log(valorTotal.innerText);
                if (carrito.length == 0) {
                    vaciarCarrito()
                    setCarritoVacio()
                    document.querySelector(".p-valor").innerText = "$0"
                }
            })
        })



    } else {
        setCarritoVacio()
    }


    let checkbox = document.querySelectorAll("input")
    let formaDePago = false
    checkbox.forEach((boton, i) => {
        checkbox[i].addEventListener("click", () => {
            checkbox.forEach((boton, i) => {
                checkbox[i].checked = false
            })
            info = { name: checkbox[i].name, price: checkbox[i].dataset.price }
            checkbox[i].checked = true
            formaDePago = true

        })
    })

    let formaDeEnvio = false
    let datosEntrega = {}
    let inputs = document.querySelectorAll(".delivery")
    let errors = []
    botones.forEach((boton, i) => {
        botones[i].addEventListener("click", () => {
            formaDeEnvio = true
        })
    })


    let realizarPedido = document.querySelector(".boton-terminar-compra")

    inputs[2].addEventListener("blur", () => {
        console.log(inputs[2].value);
        if (inputs[2].value == "") {
            inputs[2].style.border = "solid 2px red"
        }
    })

    realizarPedido.addEventListener("click", () => {
        if (botones[0].dataset.active == 1) {
            datosEntrega = {
                nombre: inputs[0].value,
                direccion: inputs[1].value,
                hora: inputs[2].value
            }
        } else {
            datosEntrega = {
                nombre: inputs[3].value,
                hora: inputs[4].value
            }
        }
        let tiempo = new Date();
        let hora = tiempo.getHours();
        let minutos = tiempo.getMinutes();
        let tiempoActual = `${hora}:${minutos}`
        console.log(tiempoActual);
    })
})