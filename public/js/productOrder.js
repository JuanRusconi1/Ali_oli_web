window.addEventListener("load", function () {
    let botonAdicionales = document.querySelector(".contenedor-adicionales")
    let arrowDown = document.querySelector(".arrow")
    let columnaAdicionales = document.querySelector(".contenedor-adicional-columna")


    let mas = document.querySelector(".mas")
    let menos = document.querySelector(".menos")
    let cantidad = document.querySelector(".numero-cantidad")
    mas.addEventListener("click", () => {
        let valor = cantidad.innerHTML
        valor++
        cantidad.innerText = valor
    })
    menos.addEventListener("click", () => {
        let valor = cantidad.innerHTML
        if (valor > 1) {
            valor--
            cantidad.innerText = valor
        } else {
            cantidad.innerText = 1
        }
    })
    botonAdicionales.addEventListener("click", () => {
        arrowDown.classList.toggle("rotate")
        columnaAdicionales.classList.toggle("flex")
    })
    /* Funciones agregar carrito */

    let añadir = document.querySelector(".boton-continuar")
    let quantity = document.querySelector(".numero-cantidad")
    let detalles = document.querySelector(".textarea-detalles")
    let salsas = document.querySelectorAll("input")


    console.log(salsas[1].checked);
    añadir.addEventListener("click", (e) => {
        let  adicional =  []
        let value = parseFloat(quantity.innerText)
        if (localStorage.carrito) {
            let carrito = JSON.parse(localStorage.carrito)
            let index = carrito.findIndex(producto => producto.id == e.target.dataset.id)
            if (index != -1) {
                carrito[index].cantidad = carrito[index].cantidad + value;
                if (carrito[index].detalles == "") {
                    carrito[index].detalles = detalles.value
                    console.log(detalles.value)
                } else {
                    carrito[index].detalles = carrito[index].detalles
                    console.log(detalles.value)
                }
            } else {
                salsas.forEach((salsa) => {
                    if (salsa.checked == true) {
                        let numero = parseFloat(salsa.name)
                        adicional.push(numero)
                    }
                })
                console.log(adicional);
                carrito.push({ id: e.target.dataset.id, cantidad: value, detalles: detalles.value, salsas: adicional })
            }
            localStorage.setItem("carrito", JSON.stringify(carrito))
        } else {
            salsas.forEach((salsa) => {
                if (salsa.checked == true) {
                    let numero = parseFloat(salsa.name)
                    adicional.push(numero)
                }
            })
            console.log(adicional);
            localStorage.setItem("carrito", JSON.stringify([{ id: e.target.dataset.id, cantidad: value, detalles: detalles.value, salsas: adicional }]))
        } 
    })

    function calcularProductos(carrito) {
        return carrito.reduce((acum, item) => acum += item.cantidad, 0);
    }

    let contador = document.querySelector(".contador")
    let carrito = JSON.parse(localStorage.carrito)

    if (carrito) {
        contador.innerText = calcularProductos(carrito)
    }
})