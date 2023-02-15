window.addEventListener("load", function () {


    let mas = document.querySelectorAll(".mas")
    let menos = document.querySelectorAll(".menos")
    let cantidades = document.querySelectorAll(".cantidad-empanada")
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
        })

        menos[i].addEventListener("click", () => {
            let valor = cantidades[i].innerHTML
            if (maximo > 0) {
                if(valor > 0) {
                valor --
                cantidades[i].innerText = valor
                maximo --
                maximoEmpanadas.innerText = `${maximo}/12`
                console.log(maximo);
            }
        }}) 
    }

})