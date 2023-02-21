/*Aqui vamos a hacer funcional los horarios del local*/
/*Horario de apertura del local 20:00PM*/
/*Horario de cierre del local 23:00PM*/
window.addEventListener("load", () => {
    let divApertura = document.querySelector(".abierto");

    setInterval(() => {
        let tiempo = new Date();
        let hora = tiempo.getHours();
        let minutos = tiempo.getMinutes();
        let tiempoActual = `${hora}:${minutos}`

        if((hora >= 20 && hora < 24) && (minutos > 0 && minutos <= 59)) {
             divApertura.style.backgroundColor = "#95c623"
             divApertura.innerHTML = `<i class="fa-solid fa-clock"></i> Abierto`    
        } else {
            divApertura.style.backgroundColor = "tomato"
            divApertura.innerHTML = `<i class="fa-solid fa-clock"></i> Cerrado`
       }
       
    }, 60000)
})