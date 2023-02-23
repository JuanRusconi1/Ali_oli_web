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

    function calcularTotal(carrito) {
        return carrito.reduce((acum, producto) => acum += producto.price * producto.cantidad, 0);
    }
    const totalAdicionales = (adicionales) => {
        let preciosTotales = []
        adicionales.forEach(adicional => {
            if (adicional.id != 42 && adicional.detail) {
                let salsas = adicional.detail
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

        carrito.forEach((item, i) => {
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

            adicionales.forEach((adicional) => {
                if (adicional.id == id && adicional.detail) {
                    if (adicional.detail.length > 0) {
                        if (adicional.id == 42) {
                            // console.log(adicional.detail.length);
                            // contador ++
                            // if (contador == 1) {
                            let empanadas = adicionales[i].detail;
                            empanadas.forEach(salsa => {
                                contenedorAdicionales[i].innerHTML +=
                                    `<div class="div-additional">
                                    <p class="titulo-additional">${salsa.cantidad}x ${salsa.name}</p>
                                    </div>`

                            })
                            // }
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
                }
            })
        });
        console.log(adicionales);
        console.log(totalAdicionales(adicionales));
        // + totalAdicionales(adicionales)
        valorTotal.innerText = `$${calcularTotal(carrito) + totalAdicionales(adicionales)}`

        let botonesEmiminar = document.querySelectorAll(".boton-eliminar")
        let itemsLista = document.querySelectorAll(".div-item-lista")
        /*Funcionalidad para eliminar un item del carrito */
        botonesEmiminar.forEach((boton, i) => {
            boton.addEventListener("click", (e) => {
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

    let formaDePago = false
    let checkbox = document.querySelectorAll(".formaDePago");

    checkbox.forEach((boton, i) => {
        checkbox[i].addEventListener("click", () => {
            checkbox.forEach((boton, i) => {
                checkbox[i].checked = false
                formaDePago = true
            })
            checkbox[i].checked = true
            errorPayment.innerText = "";
        })
    })

    let formaDeEnvio = false
    let datosEntrega = {}
    let inputs = document.querySelectorAll(".delivery")
    let errorInputs = document.querySelectorAll(".error-input")
    let errorPayment = document.querySelector(".error-payment")

    botones.forEach((boton, i) => {
        botones[0].addEventListener("click", () => {
            formaDeEnvio = true
            datosEntrega = {
                nombre: inputs[0].value,
                direccion: inputs[1].value,
                hora: inputs[2].value
            }

        })
        botones[1].addEventListener("click", () => {
            formaDeEnvio = true
            datosEntrega = {
                nombre: inputs[3].value,
                hora: inputs[4].value
            }

        })
    })

    inputs[0].addEventListener("blur", () => {
        if (inputs[0].value == "") {
            inputs[0].style.border = "solid 2px red";
            errorInputs[0].innerText = "Debes ingresar un nombre";
        } else {
            inputs[0].style.border = "solid 2px #fac82f";
            errorInputs[0].innerText = "";
            datosEntrega.nombre = inputs[0].value;
        }
    })

    inputs[1].addEventListener("blur", () => {
        if (inputs[1].value == "") {
            inputs[1].style.border = "solid 2px red";
            errorInputs[1].innerText = "Debes ingresar una dirección";
        } else {
            inputs[1].style.border = "solid 2px #fac82f";
            errorInputs[1].innerText = "";
            datosEntrega.direccion = inputs[1].value;
        }
    })

    inputs[2].addEventListener("blur", () => {
        if (inputs[2].value == "") {
            inputs[2].style.border = "solid 2px red";
            errorInputs[2].innerText = "Debes ingresar una hora";
        } else {
            inputs[2].style.border = "solid 2px #fac82f";
            errorInputs[2].innerText = "";
            datosEntrega.hora = inputs[2].value;
        }
    })

    inputs[3].addEventListener("blur", () => {
        if (inputs[3].value == "") {
            inputs[3].style.border = "solid 2px red"
            errorInputs[3].innerText = "Debes ingresar un nombre"
        } else {
            inputs[3].style.border = "solid 2px #fac82f"
            errorInputs[3].innerText = ""
            datosEntrega.nombre = inputs[3].value
        }
    })

    inputs[4].addEventListener("blur", () => {
        if (inputs[4].value == "") {
            inputs[4].style.border = "solid 2px red"
            errorInputs[4].innerText = "Debes ingresar una hora"
        } else {
            inputs[4].style.border = "solid 2px #fac82f"
            errorInputs[4].innerText = ""
            datosEntrega.hora = inputs[4].value
        }
    })

    //funciones para terminar la compra
    let realizarPedido = document.querySelector(".boton-terminar-compra")
    let errorNumber = 0
    realizarPedido.addEventListener("click", async () => {
        //creamos dos variables, 1 con el carrito y la 2 con los adicionales de cada producto
        let carrito = JSON.parse(sessionStorage.carrito)
        let adicionales = JSON.parse(sessionStorage.adicional)
        let totalFinal = document.querySelector(".p-valor").innerText
        if (botones[0].dataset.active == 1) {

            if (datosEntrega.nombre == "") {
                inputs[0].style.border = "solid 2px red"
                errorInputs[0].innerText = "Debes ingresar un nombre"
                errorNumber = 1;
            } else {
                errorNumber = 0;
            }
            if (datosEntrega.direccion == "") {
                inputs[1].style.border = "solid 2px red"
                errorInputs[1].innerText = "Debes ingresar una dirección"
                errorNumber = 1;
            } else {
                errorNumber = 0;
            }
            if (datosEntrega.hora == "") {
                inputs[2].style.border = "solid 2px red"
                errorInputs[2].innerText = "Debes ingresar una hora"
                errorNumber = 1;
            } else {
                errorNumber = 0;
            }
        }
        if (botones[1].dataset.active == 1) {
            datosEntrega = {
                nombre: inputs[3].value,
                hora: inputs[4].value
            }
            if (datosEntrega.nombre == "") {
                inputs[3].style.border = "solid 2px red"
                errorInputs[3].innerText = "Debes ingresar un nombre"
                errorNumber = 1;
            } else {
                errorNumber = 0;
            }
            if (datosEntrega.hora == "") {
                inputs[4].style.border = "solid 2px red"
                errorInputs[4].innerText = "Debes ingresar una hora"
                errorNumber = 1;
            } else {
                errorNumber = 0;
            }
        }

        let datosDePago = "";
        let tipoPagoPedido = "";
        let tipoEnvioPedido = "";
        checkbox.forEach(boton => {
            if (boton.checked == true) {
                datosDePago = `${boton.name}`
            }
        })
        console.log(datosDePago);

        if (formaDePago == false) {
            errorPayment.innerText = "Debes elegir un metodo de pago";
            errorNumber = 1;
        } else {
            tipoPagoPedido = `• Método de Pago: ${datosDePago} \n`;
            errorNumber = 0;
        }
        if (formaDeEnvio == false) {
            errorPayment.innerText = "Debes elegir una forma de entrega";
        } else {
            if (datosEntrega.direccion) {
                tipoEnvioPedido = `• Método de Entrega: Delivery \n • Recibe: ${datosEntrega.nombre} \n • Dirección: ${datosEntrega.direccion} \n • Hora de Envío: ${datosEntrega.hora} \n`
            } else {
                tipoEnvioPedido = `• Método de Entrega: Take Away \n • Retira: ${datosEntrega.nombre} \n • Hora de Retiro: ${datosEntrega.hora} \n`
            }
        }

        console.log(carrito);
        console.log(tipoEnvioPedido);
        console.log(tipoPagoPedido);
        let pedido = ""
        let productosPedido = ""
        if (carrito.length > 0 && adicionales.length > 0) {
            carrito.forEach((producto, i) => {
                let salsas = ""
                let empanadas = ""
                productosPedido += `\n${producto.cantidad}x ${producto.name} | $${producto.price} \n`
                if (adicionales[i].detail && adicionales[i].detail.length > 0) {
                    if (adicionales[i].id == 42) {
                        empanadas = adicionales[i].detail
                        empanadas.forEach((cadaEmpanada) => {
                            productosPedido += ` ${cadaEmpanada.cantidad}x ${cadaEmpanada.name}\n`
                        })
                    } else {
                        salsas = adicionales[i].detail
                        salsas.forEach((cadaSalsa) => {
                            productosPedido += ` 1x ${cadaSalsa.name} | $${cadaSalsa.price}\n`
                        })
                    }
                }
                if (producto.detalles != "") {
                    console.log("si hay detalles");
                    productosPedido += `Detalles:\n ${producto.detalles}\n`
                }
            })
        }
        console.log(productosPedido);
        if (errorNumber == 0) {
            pedido =
                `Hola, Quiero hacer un pedido, este es el detalle:\n Pedido:\n ${productosPedido}\n*Forma de Entrega*\n ${tipoEnvioPedido}\n*Forma de Pago*\n ${tipoPagoPedido}\n • Total del Pedido: ${totalFinal}`
            window.location.href = `https://api.whatsapp.com/send/?phone=5493534443386&text=${encodeURIComponent(pedido)}&amp;type=phone_number&amp;app_absent=0` 
        } else {
            errorPayment.innerText = "Debes completar todos los campos";
        }
        
    })
})