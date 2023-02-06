// Logica para mostrar los productos de cada seccion // 

window.addEventListener("load", function () {

    let tituloSeccion = document.querySelectorAll(".titulo")
    let productos = document.querySelectorAll(".columna-div-principal")

    for (let i = 0; i < tituloSeccion.length; i++) {
        tituloSeccion[i].addEventListener("click", () => {
            productos[i].classList.toggle("flex");
        })

    }
    // let texting = `hola como estas?\nTe hablo para saber como subir un archivo`
    // console.log(encodeURIComponent(texting))

    function calcularProductos(carrito) {
        return carrito.reduce((acum, item) => acum += item.cantidad, 0);
    }

    let contador = document.querySelector(".contador")
    let carrito = JSON.parse(localStorage.carrito)

    if (carrito) {
        contador.innerText = calcularProductos(carrito)
        
    }
})

