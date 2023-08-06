window.addEventListener("load", function () {
  let botonAdicionales = document.querySelector(".contenedor-adicionales");
  let arrowDown = document.querySelector(".arrow");
  let columnaAdicionales = document.querySelector(".contenedor-adicional-columna");
  let mas = document.querySelector(".mas");
  let menos = document.querySelector(".menos");
  let numeroCantidad = document.querySelector(".numero-cantidad");
  let valor = numeroCantidad.innerText
  let variedadesChampi = []

  fetch("/api/products")
    .then(res => res.json())
    .then(response => {
        let { data } = response
        data.forEach(product => {
            if (product.name.toLowerCase() == "docena de empanadas de champiñones" && product.categoryId == 6) {
                variedadesChampi.push({name: product.name, price: product.price})
            }
            if (product.name.toLowerCase() == "media docena de empanadas de champiñones" && product.categoryId == 6) {
                variedadesChampi.push({name: product.name, price: product.price})
            }
        })
    })

  mas.addEventListener("click", () => {
    valor++;
    numeroCantidad.innerText = valor;
  });
  menos.addEventListener("click", () => {
    if (valor > 1) {
      valor--;
      numeroCantidad.innerText = valor;
    } else {
      numeroCantidad.innerText = 1;
    }
  });
  if (botonAdicionales !== null) {
    botonAdicionales.addEventListener("click", () => {
      arrowDown.classList.toggle("rotate");
      columnaAdicionales.classList.toggle("flex");
    });
  }
  /* Funcionalidad agregar carrito */

  let añadir = document.querySelector(".boton-continuar");
  let detalles = document.querySelector(".textarea-detalles");
  let salsas = document.querySelectorAll("input");
  let nombre = document.querySelector(".titulo-orden").innerHTML;
  añadir.addEventListener("click", (e) => {
    let cantidad = parseFloat(numeroCantidad.innerText);
    if (nombre.toLowerCase() == 'empanada de champiñones' && cantidad == 12) {
        nombre = variedadesChampi[0].name
        añadir.dataset.price = variedadesChampi[0].price
        cantidad = 1
    }
    if (nombre.toLowerCase() == 'empanada de champiñones' && cantidad == 6) {
        nombre = variedadesChampi[1].name
        añadir.dataset.price = variedadesChampi[1].price
        cantidad = 1
    }
     let adicionales = [];
     if (sessionStorage && sessionStorage.carrito) {
       let carrito = JSON.parse(sessionStorage.carrito);
       let index = carrito.findIndex(
         (producto) => producto.name == nombre
       );
       if (index != -1) {
         carrito[index].cantidad += cantidad;
         if (carrito[index].detalles == "") {
           carrito[index].detalles = detalles.value;
         } else {
           carrito[index].detalles = carrito[index].detalles;
         }
       } else {
         salsas.forEach((salsa) => {
           if (salsa.checked == true) {
             let precioSalsa = parseFloat(salsa.dataset.price);
             let nombreSalsa = salsa.name;
             adicionales.push({ name: nombreSalsa, price: precioSalsa });
           }
         });
         carrito.push({
           id: carrito.length + 1,
           name: nombre,
           price: e.target.dataset.price,
           cantidad: cantidad,
           detalles: detalles.value,
           salsas: adicionales,
         });
       }
       sessionStorage.setItem("carrito", JSON.stringify(carrito));
     } else {
       salsas.forEach((salsa) => {
         if (salsa.checked == true) {
           let precio = parseFloat(salsa.dataset.price);
           let nombre = salsa.name;
           adicionales.push({ name: nombre, price: precio });
         }
       });
       sessionStorage.setItem(
         "carrito",
         JSON.stringify([
           {
             id: 1,
             name: nombre,
             price: e.target.dataset.price,
             cantidad: cantidad,
             detalles: detalles.value,
             salsas: adicionales,
           },
         ])
       );
     }
   });

});

// añadir.addEventListener("click", (e) => {
//     let adicional = []
//     let value = parseFloat(cantidad.innerText)
//     if (sessionStorage.carrito && sessionStorage.adicional) {
//         let carrito = JSON.parse(sessionStorage.carrito)
//         let storageAdicional = JSON.parse(sessionStorage.adicional)
//         let index = carrito.findIndex(producto => producto.id == e.target.dataset.id)
//         if (index != -1) {
//             carrito[index].cantidad = carrito[index].cantidad + value;
//             if (carrito[index].detalles == "") {
//                 carrito[index].detalles = detalles.value
//                 console.log(detalles.value)
//             } else {
//                 carrito[index].detalles = carrito[index].detalles
//                 console.log(detalles.value)
//             }
//         } else {
//             salsas.forEach((salsa) => {
//                 if (salsa.checked == true) {
//                     let precio = parseFloat(salsa.dataset.price)
//                     let nombre = salsa.name
//                     adicional.push({ name: nombre, price: precio })
//                 }
//             })
//             carrito.push({id: e.target.dataset.id, name: nombre, price: e.target.dataset.price ,cantidad: value ,  detalles: detalles.value})
//             storageAdicional.push({id: e.target.dataset.id, detail: adicional})
//         }
//         sessionStorage.setItem("carrito", JSON.stringify(carrito))
//         sessionStorage.setItem("adicional", JSON.stringify(storageAdicional))
//     } else {
//         salsas.forEach((salsa) => {
//             if (salsa.checked == true) {
//                 let precio = parseFloat(salsa.dataset.price)
//                 let nombre = salsa.name
//                 adicional.push({ name: nombre, price: precio })
//             }
//         })
//         sessionStorage.setItem("carrito", JSON.stringify([{id: e.target.dataset.id, name: nombre, price: e.target.dataset.price, cantidad: value, detalles: detalles.value}]))
//         sessionStorage.setItem("adicional", JSON.stringify([{id: e.target.dataset.id, detail: adicional}]))

//     }
// })
