window.addEventListener("load", function () {
    let titulo = document.querySelector(".titulo-orden").innerHTML
    let optionsCheck = document.querySelector(".elegir-cantidad")
    let checkbox = document.querySelectorAll("input")
    let añadir = document.querySelector(".boton-continuar-pizza");




    fetch("/api/products")
        .then(res => res.json())
        .then(productos => {
            productos.data.forEach((pizza) => {
                if (pizza.name == titulo && pizza.categoryId == 8) {
                    checkbox[0].name = `Media ${pizza.name}`;
                    checkbox[0].dataset.price = pizza.price
                    checkbox[0].dataset.id = pizza.id
                }
            });
        })
    //deselecionar el checkbox contrario al que estamos activando
    let info = { name: checkbox[1].name, price: checkbox[1].dataset.price }
    checkbox.forEach((boton, i) => {
        checkbox[i].addEventListener("click", () => {
            checkbox.forEach((boton, i) => {
                checkbox[i].checked = false
            })
            info = { name: checkbox[i].name, price: checkbox[i].dataset.price }
            checkbox[i].checked = true
            añadir.dataset.id = checkbox[i].dataset.id
        })

    })


    let cantidad = document.querySelector(".numero-cantidad");
    let detalles = document.querySelector(".textarea-detalles")
    añadir.addEventListener("click", (e) => {

        let value = parseFloat(cantidad.innerText)
        if (sessionStorage.carrito) {
            let carrito = JSON.parse(sessionStorage.carrito);
            let storageAdicional = JSON.parse(sessionStorage.adicional);
            let index = carrito.findIndex(producto => producto.id == e.target.dataset.id);
            if (index != -1) {
                carrito[index].cantidad = carrito[index].cantidad + value;
                if (carrito[index].detalles == "") {
                    carrito[index].detalles = detalles.value
                } else {
                    carrito[index].detalles = carrito[index].detalles
                }
            } else {
                carrito.push({ id: e.target.dataset.id, ...info, cantidad: value, detalles: detalles.value })
                storageAdicional.push({id: e.target.dataset.id})
            }
            sessionStorage.setItem("carrito", JSON.stringify(carrito))
            sessionStorage.setItem("adicional", JSON.stringify(storageAdicional))
        } else {

            sessionStorage.setItem("carrito", JSON.stringify([{ id: e.target.dataset.id, ...info, cantidad: value, detalles: detalles.value }]))
            sessionStorage.setItem("adicional", JSON.stringify([{id: e.target.dataset.id}]))

        }
    })

    function calcularProductos(carrito) {
        return carrito.reduce((acum, item) => acum += item.cantidad, 0);
    }

    let contador = document.querySelector(".contador")
    let carrito = JSON.parse(sessionStorage.carrito)

    if (carrito) {
        contador.innerText = calcularProductos(carrito)
    }
})