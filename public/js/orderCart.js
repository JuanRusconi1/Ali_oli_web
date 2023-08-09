window.addEventListener("load", function () {
  let botones = document.querySelectorAll(".div-tipo-entrega");
  let delivery = document.querySelector(".div-formulario-delivery");
  let takeAway = document.querySelector(".div-formulario-take-away");
  botones[0].addEventListener("click", () => {
    botones[0].classList.add("active");
    botones[1].classList.remove("active");
    botones[0].dataset.active = 1;
    botones[1].dataset.active = 0;
    delivery.style.display = "block";
    takeAway.style.display = "none";
  });
  botones[1].addEventListener("click", () => {
    botones[1].classList.add("active");
    botones[0].classList.remove("active");
    botones[1].dataset.active = 1;
    botones[0].dataset.active = 0;
    takeAway.style.display = "block";
    delivery.style.display = "none";
  });

  /*Funciones para Carrito */

  function setCarritoVacio() {
    listCart.innerHTML = `<div class="titulo-div">No tienes productos en tu carrito</div>`;
  }

  function vaciarCarrito() {
    sessionStorage.removeItem("carrito");
  }

  function calcularTotal(carrito) {
    return carrito.reduce(
      (acum, item) => (acum += item.price * item.cantidad),
      0
    );
  }
  const totalSalsas = (carrito) => {
    let preciosTotales = [];
    carrito.forEach((item) => {
      if (item.salsas && item.salsas.length > 0) {
        let { salsas } = item;
        salsas.forEach((salsa) => {
          preciosTotales.push({ price: salsa.price });
        });
      }
    });
    return preciosTotales.reduce((acum, salsa) => (acum += salsa.price), 0);
  };
  let listCart = document.querySelector(".div-contenedor-item");
  if (sessionStorage && sessionStorage.carrito) {
    let carrito = JSON.parse(sessionStorage.carrito);
    let valorTotal = document.querySelector(".p-valor");
    carrito.forEach((item, i) => {
      let { salsas, variedades } = item;
      listCart.innerHTML += `<div class="div-item-lista" >
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
                </div>`;
      let contenedorAdicionales = document.querySelectorAll(".additionals");
      if (salsas && salsas.length > 0) {
        salsas.forEach((salsa) => {
          contenedorAdicionales[i].innerHTML += `<div class="div-additional">
                                                <p class="titulo-additional">${salsa.name}</p>
                                                <p class="precio-additional">$${salsa.price}</p>
                                            </div>`;
        });
      }
      if (variedades && variedades.length > 0) {
        variedades.forEach((empanada) => {
          contenedorAdicionales[i].innerHTML += `<div class="div-additional">
                                                <p class="titulo-additional">${empanada.cantidad}x ${empanada.name}</p>
                                            </div>`;
        });
      }
    });

    valorTotal.innerText = `$${ calcularTotal(carrito) + totalSalsas(carrito)}`;

    let botonesEmiminar = document.querySelectorAll(".boton-eliminar");
    let itemsLista = document.querySelectorAll(".div-item-lista");
    /*Funcionalidad para eliminar un item del carrito */
    botonesEmiminar.forEach((boton, i) => {
      boton.addEventListener("click", (e) => {
        let id = boton.dataset.id;
        carrito.forEach((producto, i) => {
          if (producto.id == id) {
            carrito.splice(i, 1);
          }
        });
        itemsLista[i].style.display = "none";
        sessionStorage.setItem("carrito", JSON.stringify(carrito));
        valorTotal.innerText = `$${
          calcularTotal(carrito) + totalSalsas(carrito)
        }`;
        if (carrito.length == 0) {
          vaciarCarrito();
          setCarritoVacio();
          document.querySelector(".p-valor").innerText = "$0";
        }
      });
    });
  } else {
    setCarritoVacio();
  }

  let formaDePago = false;
  let checkbox = document.querySelectorAll(".formaDePago");

  checkbox.forEach((boton, i) => {
    checkbox[i].addEventListener("click", () => {
      checkbox.forEach((boton, i) => {
        checkbox[i].checked = false;
        formaDePago = true;
      });
      checkbox[i].checked = true;
      errorPayment.innerText = "";
    });
  });

  let formaDeEnvio = false;
  let datosEntrega = {};
  let inputs = document.querySelectorAll(".delivery");
  let errorInputs = document.querySelectorAll(".error-input");
  let errorPayment = document.querySelector(".error-payment");

  botones.forEach((boton, i) => {
    botones[0].addEventListener("click", () => {
      datosEntrega = {
        nombre: inputs[0].value,
        direccion: inputs[1].value,
        hora: inputs[2].value,
      };
    });
    botones[1].addEventListener("click", () => {
      datosEntrega = {
        nombre: inputs[3].value,
        hora: inputs[4].value,
      };
    });
  });

  inputs[0].addEventListener("blur", () => {
    if (inputs[0].value == "") {
      inputs[0].style.border = "solid 2px red";
      errorInputs[0].innerText = "Debes ingresar un nombre";
    } else {
      inputs[0].style.border = "solid 2px #fac82f";
      errorInputs[0].innerText = "";
      datosEntrega.nombre = inputs[0].value;
    }
  });

  inputs[1].addEventListener("blur", () => {
    if (inputs[1].value == "") {
      inputs[1].style.border = "solid 2px red";
      errorInputs[1].innerText = "Debes ingresar una dirección";
    } else {
      inputs[1].style.border = "solid 2px #fac82f";
      errorInputs[1].innerText = "";
      datosEntrega.direccion = inputs[1].value;
    }
  });

  inputs[2].addEventListener("blur", () => {
    if (inputs[2].value == "") {
      inputs[2].style.border = "solid 2px red";
      errorInputs[2].innerText = "Debes ingresar una hora";
    } else {
      inputs[2].style.border = "solid 2px #fac82f";
      errorInputs[2].innerText = "";
      datosEntrega.hora = inputs[2].value;
    }
  });

  inputs[3].addEventListener("blur", () => {
    if (inputs[3].value == "") {
      inputs[3].style.border = "solid 2px red";
      errorInputs[3].innerText = "Debes ingresar un nombre";
    } else {
      inputs[3].style.border = "solid 2px #fac82f";
      errorInputs[3].innerText = "";
      datosEntrega.nombre = inputs[3].value;
    }
  });

  inputs[4].addEventListener("blur", () => {
    if (inputs[4].value == "") {
      inputs[4].style.border = "solid 2px red";
      errorInputs[4].innerText = "Debes ingresar una hora";
    } else {
      inputs[4].style.border = "solid 2px #fac82f";
      errorInputs[4].innerText = "";
      datosEntrega.hora = inputs[4].value;
    }
  });

  //funcion para terminar la compra
  let realizarPedido = document.querySelector(".boton-terminar-compra");
  realizarPedido.addEventListener("click", async () => {
    errorPayment.innerText = "";

    let errorNumber = 0;
    let errorSinPago = 0;
    let errorSinEnvio = 0;
    let carrito = JSON.parse(sessionStorage.carrito);
    let totalFinal = document.querySelector(".p-valor").innerText;
    if (botones[0].dataset.active == 1) {
      if (inputs[0].value == "") {
        inputs[0].style.border = "solid 2px red";
        errorInputs[0].innerText = "Debes ingresar un nombre";
        errorNumber = 1;
        formaDeEnvio = false;
      } else {
        errorNumber = 0;
        formaDeEnvio = true;
      }
      if (inputs[1].value == "") {
        inputs[1].style.border = "solid 2px red";
        errorInputs[1].innerText = "Debes ingresar una dirección";
        errorNumber = 1;
        formaDeEnvio = false;
      } else {
        errorNumber = 0;
        formaDeEnvio = true;
      }
      if (inputs[2].value == "") {
        inputs[2].style.border = "solid 2px red";
        errorInputs[2].innerText = "Debes ingresar una hora";
        errorNumber = 1;
        formaDeEnvio = false;
      } else {
        errorNumber = 0;
        formaDeEnvio = true;
      }
    }
    if (botones[1].dataset.active == 1) {
      datosEntrega = {
        nombre: inputs[3].value,
        hora: inputs[4].value,
      };
      if (inputs[3].value == "") {
        inputs[3].style.border = "solid 2px red";
        errorInputs[3].innerText = "Debes ingresar un nombre";
        errorNumber = 1;
        formaDeEnvio = false;
      } else {
        errorNumber = 0;
        formaDeEnvio = true;
      }
      if (inputs[4].value == "") {
        inputs[4].style.border = "solid 2px red";
        errorInputs[4].innerText = "Debes ingresar una hora";
        errorNumber = 1;
        formaDeEnvio = false;
      } else {
        errorNumber = 0;
        formaDeEnvio = true;
      }
    }

    let datosDePago = "";
    let tipoPagoPedido = "";
    let tipoEnvioPedido = "";
    checkbox.forEach((boton) => {
      if (boton.checked == true) {
        datosDePago = `${boton.name}`;
      }
    });

    if (formaDePago == false) {
      errorPayment.innerText += "Debes elegir un metodo de pago\n";
      errorSinPago = 1;
    } else {
      tipoPagoPedido = `• Método de Pago: ${datosDePago} \n`;
      errorSinPago = 0;
    }
    if (formaDeEnvio == false) {
      errorPayment.innerText += "Debes elegir una forma de entrega\n";
      errorSinEnvio = 1;
    } else {
      if (datosEntrega.direccion) {
        tipoEnvioPedido = `• Método de Entrega: Delivery \n • Recibe: ${datosEntrega.nombre} \n • Dirección: ${datosEntrega.direccion} \n • Hora de Envío: ${datosEntrega.hora} \n`;
      } else {
        tipoEnvioPedido = `• Método de Entrega: Take Away \n • Retira: ${datosEntrega.nombre} \n • Hora de Retiro: ${datosEntrega.hora} \n`;
      }
      errorSinEnvio = 0;
    }
    let pedido = "";
    let productosPedido = "";
    if (carrito.length > 0) {
      carrito.forEach((producto, i) => {
        let salsas = "";
        let empanadas = "";
        productosPedido += `\n${producto.cantidad}x ${producto.name} | $${producto.price} \n`;
        if (producto.variedades && producto.variedades.length > 0) {
            empanadas = producto.variedades
            empanadas.forEach((cadaEmpanada) => {
                productosPedido += ` ${cadaEmpanada.cantidad}x ${cadaEmpanada.name}\n`;
              });
          }
        if (producto.salsas && producto.salsas.length > 0) {
            salsas = producto.salsas
            salsas.forEach((cadaSalsa) => {
                productosPedido += ` 1x ${cadaSalsa.name} | $${cadaSalsa.price}\n`;
              });
        }
        if (producto.detalles !== "") {
          productosPedido += `Detalles:\n ${producto.detalles}\n`;
        }
      });
    }
    function nuevoPedido (carrito) {
      const orderitem = []
      carrito.map((item, i) => {
        let docena = []
        if (item.variedades && item.variedades.length > 0) {
          item.variedades.map((empanada) => {
            docena.push({name: empanada.name, quantity: empanada.cantidad})
          })
        }
        orderitem.push({
          productName: item.name,
          productCategory: item.category,
          price: item.price,
          quantity: item.cantidad,
          docena: docena
        })
      })
      const order = {
        buyerName: datosEntrega.nombre,
        paymentType: datosDePago,
        total: totalFinal.slice(1),
        orderitem: orderitem
      }
      return order
    }
    if (errorNumber == 0 && errorSinEnvio == 0 && errorSinPago == 0) {
      fetch("/api/sales/create", {
        method: 'POST',
        body: JSON.stringify(nuevoPedido(carrito)),
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(response => response.json())
        .then(orderResponse => {
          if(orderResponse.ok) {
            pedido = `Hola, Quiero hacer un pedido, este es el detalle:\n Pedido N°${orderResponse.order.id}\n ${productosPedido}\n*Forma de Entrega*\n ${tipoEnvioPedido}\n*Forma de Pago*\n ${tipoPagoPedido}\n • Total del Pedido: ${totalFinal}`;
            window.location.href = `https://api.whatsapp.com/send/?phone=5493534443386&text=${encodeURIComponent(
              pedido
            )}&amp;type=phone_number&amp;app_absent=0`;
            errorPayment.innerText = "";
          }
        })
    } else {
      errorPayment.innerText += "Debes completar todos los campos";
    }
  });
});
