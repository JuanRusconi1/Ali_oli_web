window.addEventListener("load", function () {


    let mas = document.querySelectorAll(".mas")
    let menos = document.querySelectorAll(".menos")
    let cantidades = document.querySelectorAll(".cantidad-empanada")
    let empanadas = document.querySelectorAll(".div-tipo-empanada")
    let tituloEmpanadas = document.querySelectorAll(".nombre-tipo-empanada")
    let maximoEmpanadas = document.querySelector(".titulo-maxima")

    let maximo = 0

    for (let i = 0; i < cantidades.length; i++) {     
    
        mas[i].addEventListener("click", () => {
            let valor = cantidades[i].innerHTML
            if(maximo < 12) {
            maximo ++
            maximoEmpanadas.innerText = `${maximo}/12`
            valor++
            cantidades[i].innerText = valor
            }
            if(maximo == 12) {
                document.querySelector(".div-contenedor-maxima").style.border = "3px #95c623 solid"
                let errores = document.querySelector(".error-active")
                errores.innerHTML = ``
            }
        })

        menos[i].addEventListener("click", () => {
            let valor = cantidades[i].innerHTML
            if (maximo > 0) {
                if(valor > 0) {
                valor --
                cantidades[i].innerText = valor
                maximo --
                maximoEmpanadas.innerText = `${maximo}/12`
            }
            if(maximo < 12) {
                document.querySelector(".div-contenedor-maxima").style.border = "3px white solid"
            }
        }}) 
    }
    
    let añadir = document.querySelector(".boton-continuar")
    let nombre = document.querySelector(".titulo-orden").innerHTML
    console.log(nombre);
    añadir.addEventListener("click", (e) => {
        let adicional = []
        if(maximo == 12){
            if (sessionStorage.carrito && sessionStorage.adicional) {
            let carrito = JSON.parse(sessionStorage.carrito)
            let storageAdicional = JSON.parse(sessionStorage.adicional)
            let index = carrito.findIndex(producto => producto.id == e.target.dataset.id)
            if (index != -1) {
                let errores = document.querySelector(".error-active")
            errores.innerHTML = `"<p class="error">No puedes pedir otra docena de empanadas</p>"`
            document.querySelector(".div-contenedor-maxima").style.border = "3px tomato solid"
            } else {
                empanadas.forEach((empa, i) => {
                    if(cantidades[i].innerHTML > 0) {
                        adicional.push({name: tituloEmpanadas[i].innerText, cantidad: cantidades[i].innerHTML})
                    }
                })
                carrito.push({id: e.target.dataset.id, name: nombre, price: e.target.dataset.price, cantidad: 1, detalles: ""})
                storageAdicional.push({id: e.target.dataset.id, detail: adicional})              
            }
            sessionStorage.setItem("carrito", JSON.stringify(carrito))
            sessionStorage.setItem("adicional", JSON.stringify(storageAdicional))
        } else {
            console.log(cantidades[1].innerHTML);
            empanadas.forEach((empa, i) => {
                if(cantidades[i].innerHTML > 0) {
                    adicional.push({name: tituloEmpanadas[i].innerText, cantidad: cantidades[i].innerHTML})
                }
            })
            sessionStorage.setItem("carrito", JSON.stringify([{id: e.target.dataset.id, name: nombre, price: e.target.dataset.price, cantidad: 1, detalles: ""}]))
            sessionStorage.setItem("adicional", JSON.stringify([{id: e.target.dataset.id, detail: adicional}]))
            
        }} else {
            let errores = document.querySelector(".error-active")
            errores.innerHTML = `"<p class="error">Agrega mas empanadas para completar la docena</p>"`
            document.querySelector(".div-contenedor-maxima").style.border = "3px tomato solid"
        }
    })

    // funcion para mostrar la cantidad de productos en el carrito
    function calcularProductos(carrito) {
        return carrito.reduce((acum, item) => acum += item.cantidad, 0);
    }

    let contador = document.querySelector(".contador")
    let carrito = JSON.parse(sessionStorage.carrito)

    if (carrito) {
        contador.innerText = calcularProductos(carrito)
    }

})