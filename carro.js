let productosEnCarro = localStorage.getItem("productos-en-carro")
productosEnCarro = JSON.parse(productosEnCarro);


const contenedorcarroVacio = document.querySelector("#contenedor-carro-vacio");
const contenedorcarroProductos = document.querySelector("#contenedor-carro-productos");
const contenedorcarroAcciones = document.querySelector("#contenedor-carro-acciones");
const contenedorcarroComprado = document.querySelector("#contenedor-carro-vacio");
let botonesEliminar = document.querySelectorAll(".carro-producto-eliminar");
const botonVaciar = document.querySelector("#carro-acciones-vaciar");
const contenedorTotal = document.querySelector("#Total");
const botonComprar = document.querySelector("#carro-acciones-comprar");

function cargarProductosCarro(){
    if(productosEnCarro && productosEnCarro.length > 0){

        contenedorcarroVacio.classList.add("disabled");
        contenedorcarroProductos.classList.remove("disabled");
        contenedorcarroAcciones.classList.remove("disabled");
        contenedorcarroComprado.classList.add("disabled");
    
        contenedorcarroProductos.innerHTML = "";
    
    productosEnCarro.forEach(producto => {
    
        const div = document.createElement("div");
        div.classList.add("carro-producto");
        div.innerHTML = `
        <img class="carro-producto-img" src="${producto.imagen}" alt="${producto.titulo}">
                    <div class="carro-producto-titulo">
                        <small>Nombre del producto</small>
                        <h3>${producto.titulo}</h3>
                    </div>
                    <div class="carro-producto-cantidad">
                        <small>Cantidad</small>
                        <p>${producto.cantidad}</p>
                    </div>
                    <div class="carro-producto-precio">
                        <small>Precio</small>
                        <p>${producto.precio}</p>
                    </div>
                    <div class="carro-producto-subtotal">
                        <small>Subtotal</small>
                        <p>${producto.precio * producto.cantidad}</p>
                    </div>
                    <button class="carro-producto-eliminar" id="${producto.id}"><i class="bi bi-bag-x-fill"></i></button>
                    
        `;
    
        contenedorcarroProductos.append(div);
    
    })

    
    } else{
        contenedorcarroVacio.classList.add("disabled");
        contenedorcarroProductos.classList.add("disabled");
        contenedorcarroAcciones.classList.add("disabled");
        contenedorcarroComprado.classList.add("disabled");
    }
    actualizarBotonesEliminar();
    actualizarTotal();
}

cargarProductosCarro();

function actualizarBotonesEliminar() {

    botonesEliminar = document.querySelectorAll(".carro-producto-eliminar");

    botonesEliminar.forEach(boton => {
        boton.addEventListener("click", eliminarDelCarro)
    });
}

function eliminarDelCarro(e){
    const idBoton = e.currentTarget.id;

    const index = productosEnCarro.findIndex(producto => producto.id === idBoton);

    productosEnCarro.splice(index, 1);

    cargarProductosCarro();

    localStorage.setItem("productos-en-carro", JSON.stringify(productosEnCarro));

}

botonVaciar.addEventListener("click", vaciarCarro);

function vaciarCarro(){
    productosEnCarro.length = 0;
    localStorage.setItem("productos-en-carro", JSON.stringify(productosEnCarro));
    cargarProductosCarro();

}
function actualizarTotal(){
    const totalCalculado = productosEnCarro.reduce((acc, producto) => acc + (producto.precio * producto.cantidad), 0)
    Total.innerText = `PYG${totalCalculado}`;

}

botonComprar.addEventListener("click", comprarCarro);

function comprarCarro(){
    productosEnCarro.length = 0;
    localStorage.setItem("productos-en-carro", JSON.stringify(productosEnCarro));
    contenedorcarroVacio.classList.add("disabled");
    contenedorcarroProductos.classList.add("disabled");
    contenedorcarroAcciones.classList.add("disabled");
    contenedorcarroComprado.classList.add("disabled");

}
