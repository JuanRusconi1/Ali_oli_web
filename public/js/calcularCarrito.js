window.addEventListener("load", function () {
  function calcularProductos() {
    return carrito.reduce((acum, item) => (acum += item.cantidad), 0);
  }
  let contador = document.querySelector(".contador");
  let carrito = JSON.parse(sessionStorage.carrito);
  if (carrito) {
    contador.innerText = calcularProductos(carrito);
  }
});
