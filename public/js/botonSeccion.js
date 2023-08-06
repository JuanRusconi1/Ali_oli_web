// Logica para mostrar los productos de cada seccion // 
window.addEventListener("load", function () {

    let tituloSeccion = document.querySelectorAll(".titulo")
    let productos = document.querySelectorAll(".columna-div-principal")
    let productosTitulo = document.querySelectorAll(".titulo-nombre-p")
    let productosPrice = document.querySelectorAll(".titulo-precio-p")

    tituloSeccion.forEach((titulo, i)=> {
        titulo.addEventListener('click', () => { 
            if (productos[i].classList[1] !== 'flex') {
                productos.forEach((producto, i) => {
                    productos[i].classList.remove("flex")
                })
                productos[i].classList.add("flex");
            } else {
                productos[i].classList.remove("flex");
            }

        })
        
    })

    let preciosPizza = document.querySelectorAll(".media-price");
    let medias = []
    fetch("/api/products")
    .then(products => products.json())
    .then(products => {
        products.data.forEach(item => {
            if(item.categoryId == 8) {
                medias.push({name: item.name, price: item.price})
            }
        });
        for (let i = 0; i < medias.length; i++) {
            preciosPizza[i].innerText = `${preciosPizza[i].innerText} / $${medias[i].price}`    
        }
        let EmpanadasChampi = products.data.filter((product) => product.categoryId === 6 && product.name.toLowerCase().includes("champiñones"))
        for (let i = 0; i < productosTitulo.length; i++) {
             if (productosTitulo[i].innerText.toLowerCase() === "empanada de champiñones") {
                productosPrice[i].innerText = `C/U: $${EmpanadasChampi[0].price} / Media: $${EmpanadasChampi[2].price} / Docena: $${EmpanadasChampi[1].price}`
            }
        }
    }) 
    
})

