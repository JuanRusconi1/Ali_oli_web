window.addEventListener("load", function () {
  let mas = document.querySelectorAll(".mas");
  let menos = document.querySelectorAll(".menos");
  let cantidades = document.querySelectorAll(".cantidad-empanada");
  let empanadas = document.querySelectorAll(".div-tipo-empanada");
  let tituloEmpanadas = document.querySelectorAll(".nombre-tipo-empanada");
  let cantidadEmpanadas = document.querySelector(".cantidad-pedido");
  let maximoEmpanadas = document.querySelector(".cantidad-maxima");
  let añadir = document.querySelector(".boton-continuar");
  let nombre = document.querySelector(".titulo-orden").innerHTML;
  nombre.slice(0, 6).toLowerCase() === "docena"
    ? (maximoEmpanadas.innerText = 12)
    : (maximoEmpanadas.innerText = 6);
  let maximo = 0;
    
  for (let i = 0; i < cantidades.length; i++) {
    mas[i].addEventListener("click", () => {
      let valor = cantidades[i].innerHTML;
      if (maximo < maximoEmpanadas.innerText) {
        maximo++;
        cantidadEmpanadas.innerText = maximo;
        valor++;
        cantidades[i].innerText = valor;
      }
      if (maximo == maximoEmpanadas.innerText) {
        document.querySelector(".div-contenedor-maxima").style.border =
          "3px #95c623 solid";
        let errores = document.querySelector(".error-active");
        errores.innerHTML = ``;
      }
    });

    menos[i].addEventListener("click", () => {
      let valor = cantidades[i].innerHTML;
      if (maximo > 0) {
        if (valor > 0) {
          valor--;
          cantidades[i].innerText = valor;
          maximo--;
          cantidadEmpanadas.innerText = maximo;
        }
        if (maximo < maximoEmpanadas.innerText) {
          document.querySelector(".div-contenedor-maxima").style.border =
            "3px white solid";
        }
      }
    });
  }

  añadir.addEventListener("click", (e) => {
    e.preventDefault();
    let variedadEmpanadas = [];
    if (maximo == maximoEmpanadas.innerText) {
      if (sessionStorage && sessionStorage.carrito) {
        let carrito = JSON.parse(sessionStorage.carrito);
        empanadas.forEach((empa, i) => {
          if (cantidades[i].innerHTML > 0) {
            variedadEmpanadas.push({
              name: tituloEmpanadas[i].innerText,
              cantidad: cantidades[i].innerHTML,
            });
          }
        });
        carrito.push({
          id: carrito.length + 1,
          name: nombre,
          price: e.target.dataset.price,
          cantidad: 1,
          category: e.target.dataset.category,
          variedades: variedadEmpanadas,
        });
        sessionStorage.setItem("carrito", JSON.stringify(carrito));
      } else {
        empanadas.forEach((empa, i) => {
          if (cantidades[i].innerHTML > 0) {
            variedadEmpanadas.push({
              name: tituloEmpanadas[i].innerText,
              cantidad: cantidades[i].innerHTML,
            });
          }
        });
        sessionStorage.setItem(
          "carrito",
          JSON.stringify([
            {
              id: 1,
              name: nombre,
              price: e.target.dataset.price,
              cantidad: 1,
              category: e.target.dataset.category,
              variedades: variedadEmpanadas,
            },
          ])
        );
      }
      window.location.replace("/")
    } else {
      let errores = document.querySelector(".error-active");
      errores.innerHTML = `"<p class="error">Agrega mas empanadas para completar</p>"`;
      document.querySelector(".div-contenedor-maxima").style.border =
        "3px tomato solid";
    }
  });

  // funcion para mostrar la cantidad de productos en el carrito

});

// añadir.addEventListener("click", (e) => {
//     e.preventDefault()
//     let adicional = []
//     if(maximo == maximoEmpanadas.innerText) {
//         if (sessionStorage && sessionStorage.carrito) {
//         let carrito = JSON.parse(sessionStorage.carrito)
//         let storageAdicional = JSON.parse(sessionStorage.adicional)
//         let index = carrito.findIndex(producto => producto.id == e.target.dataset.id)
//         if (index != -1) {
//             let errores = document.querySelector(".error-active")
//         errores.innerHTML = `"<p class="error">No puedes pedir otra docena de empanadas</p>"`
//         document.querySelector(".div-contenedor-maxima").style.border = "3px tomato solid"
//         } else {
//             empanadas.forEach((empa, i) => {
//                 if(cantidades[i].innerHTML > 0) {
//                     adicional.push({name: tituloEmpanadas[i].innerText, cantidad: cantidades[i].innerHTML})
//                 }
//             })
//             carrito.push({id: e.target.dataset.id, name: nombre, price: e.target.dataset.price, cantidad: 1, detalles: ""})
//             storageAdicional.push({id: e.target.dataset.id, detail: adicional})
//         }
//         sessionStorage.setItem("carrito", JSON.stringify(carrito))
//         sessionStorage.setItem("adicional", JSON.stringify(storageAdicional))
//     } else {
//         empanadas.forEach((empa, i) => {
//             if(cantidades[i].innerHTML > 0) {
//                 adicional.push({name: tituloEmpanadas[i].innerText, cantidad: cantidades[i].innerHTML})
//             }
//         })
//         sessionStorage.setItem("carrito", JSON.stringify([{id: e.target.dataset.id, name: nombre, price: e.target.dataset.price, cantidad: 1, detalles: ""}]))
//         sessionStorage.setItem("adicional", JSON.stringify([{id: e.target.dataset.id, detail: adicional}]))

//     }} else {
//         let errores = document.querySelector(".error-active")
//         errores.innerHTML = `"<p class="error">Agrega mas empanadas para completar la docena</p>"`
//         document.querySelector(".div-contenedor-maxima").style.border = "3px tomato solid"
//     }
// })
