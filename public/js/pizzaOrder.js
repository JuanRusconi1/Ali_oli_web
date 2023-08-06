window.addEventListener("load", function () {
    let titulo = document.querySelector(".titulo-orden").innerHTML
    let optionsCheck = document.querySelector(".elegir-cantidad")
    let checkbox = document.querySelectorAll("input")
    let añadir = document.querySelector(".boton-continuar-pizza");




    fetch("/api/products")
        .then(res => res.json())
        .then(productos => {
            productos.data.forEach((pizza) => {
                if (pizza.name.toLowerCase().includes(`media ${titulo.toLocaleLowerCase()}`) && pizza.categoryId == 8) {
                    checkbox[0].name = pizza.name;
                    checkbox[0].dataset.price = pizza.price
                    checkbox[0].dataset.name = pizza.name
                }
            });
        })
    //deseleccióna el checkbox contrario al que estamos selecciónando
    let info = { name: checkbox[1].name, price: checkbox[1].dataset.price }
    checkbox.forEach((boton, i) => {
        checkbox[i].addEventListener("click", () => {
            checkbox.forEach((boton, i) => {
                checkbox[i].checked = false
            })
            info = { name: checkbox[i].name, price: checkbox[i].dataset.price }
            checkbox[i].checked = true
            añadir.dataset.name = checkbox[i].dataset.name
        })

    })


    let cantidad = document.querySelector(".numero-cantidad");
    let detalles = document.querySelector(".textarea-detalles")
    añadir.addEventListener("click", (e) => {
        let value = parseFloat(cantidad.innerText)
        if (sessionStorage && sessionStorage.carrito) {
            let carrito = JSON.parse(sessionStorage.carrito);
            let index = carrito.findIndex(producto => producto.name == añadir.dataset.name);
            if (index != -1) {
                carrito[index].cantidad = carrito[index].cantidad + value;
                if (carrito[index].detalles == "") {
                    carrito[index].detalles = detalles.value
                } else {
                    carrito[index].detalles = carrito[index].detalles
                }
            } else {
                carrito.push({ id: carrito.length + 1, ...info, cantidad: value, detalles: detalles.value })
            }
            sessionStorage.setItem("carrito", JSON.stringify(carrito))
        } else {

            sessionStorage.setItem("carrito", JSON.stringify([{ id: 1, ...info, cantidad: value, detalles: detalles.value }]))

        }
    })
})