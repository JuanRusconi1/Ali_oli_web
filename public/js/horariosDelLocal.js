/*Aqui vamos a hacer funcional los horarios del local*/
/*Horario de apertura del local 20:00PM*/
/*Horario de cierre del local 23:00PM*/
window.addEventListener("load", () => {
    let divApertura = document.querySelector(".abierto");

    setInterval(() => {
        let tiempoActual = new Date();
        let hora = tiempoActual.getHours();
        
        if(hora == 20) {
             divApertura.style.backgroundColor = "#95c623"
             divApertura.innerHTML = `<i class="fa-solid fa-clock"></i> Abierto`    
        }
        if(hora == 23) {
            divApertura.style.backgroundColor = "tomato"
            divApertura.innerHTML = `<i class="fa-solid fa-clock"></i> Cerrado`
       }
       
    }, 60000)
})