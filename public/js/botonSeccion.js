// Logica para mostrar los productos de cada seccion // 
window.addEventListener("load", function () {

    let tituloSeccion = document.querySelectorAll(".titulo")
    let productos = document.querySelectorAll(".columna-div-principal")
    
    for (let i = 0; i < tituloSeccion.length; i++) {
        tituloSeccion[i].addEventListener("click", () => {
            productos[i].classList.toggle("flex");
        })

    } 


    function calcularProductos(carrito) {
        return carrito.reduce((acum, item) => acum += item.cantidad, 0);
    }

    if(sessionStorage ){
    let contador = document.querySelector(".contador")
    let carrito = JSON.parse(sessionStorage.carrito)
    console.log(carrito);
    if (carrito) {
        contador.innerText = calcularProductos(carrito)
        
    }}
    
    let preciosPizza = document.querySelectorAll(".media-price");
    let medias = []
    fetch("/api/products")
    .then(res => res.json())
    .then(products => {
        products.data.forEach(item => {
            if(item.categoryId == 8) {
                medias.push({name: item.name, price: item.price})
            }
        });
        for (let i = 0; i < medias.length; i++) {
            preciosPizza[i].innerText = `${preciosPizza[i].innerText} / ${medias[i].price}`    
        }
    })
      
    
})

