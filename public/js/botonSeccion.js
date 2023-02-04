// Logica para mostrar los productos de cada seccion // 

window.addEventListener("load", function () {

    let tituloSeccion = document.querySelectorAll(".titulo")
    let productos = document.querySelectorAll(".columna-div-principal")

    for (let i = 0; i < tituloSeccion.length; i++) {
        tituloSeccion[i].addEventListener("click", () => {
            productos[i].classList.toggle("flex");
        })

    }
})

