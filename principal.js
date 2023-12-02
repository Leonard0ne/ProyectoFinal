const productos = [
    {
        id: "Producto-01",
        titulo: "Flor Negra",
        imagen: "Img-productos/FuentesyLamparas/Producto-01.png",
        categoria: {
            nombre: "Fuentes y Lamparas",
            id: "Lamparas"
        },
        precio: 35000
    },
    {
        id: "Producto-02",
        titulo: "Mano Oscura",
        imagen: "Img-productos/FuentesyLamparas/Producto-02.png",
        categoria: {
            nombre: "Fuentes y Lamparas",
            id: "Lamparas"
        },
        precio: 40000
    },
    {
        id: "Producto-03",
        titulo: "Mano Marrón",
        imagen: "Img-productos/FuentesyLamparas/Producto-03.png",
        categoria: {
            nombre: "Fuentes y Lamparas",
            id: "Lamparas"
        },
        precio: 40000
    },
    {
        id: "Producto-04",
        titulo: "Lampara de sal",
        imagen: "Img-productos/FuentesyLamparas/Producto-04.png",
        categoria: {
            nombre: "Fuentes y Lamparas",
            id: "Lamparas"
        },
        precio: 70000
    },
    {
        id: "Producto-05",
        titulo: "Lampara de Sal Cuadrada",
        imagen: "Img-productos/FuentesyLamparas/Producto-05.png",
        categoria: {
            nombre: "Fuentes y Lamparas",
            id: "Lamparas"
        },
        precio: 90000
    },
    {
        id: "Producto-06",
        titulo: "Saphirus",
        imagen: "Img-productos/Aromatizantes/Producto-06.png",
        categoria: {
            nombre: "Aromatizantes",
            id: "aromatizantes"
        },
        precio: 15000
    },
    {
        id: "Producto-07",
        titulo: "Palo Aromatico Saphirus",
        imagen: "Img-productos/Aromatizantes/Producto-07.png",
        categoria: {
            nombre: "Aromatizantes",
            id: "aromatizantes"
        },
        precio: 20000
    },
    {
        id: "Producto-08",
        titulo: "Difusor para autos",
        imagen: "Img-productos/Aromatizantes/Producto-08.png",
        categoria: {
            nombre: "Aromatizantes",
            id: "aromatizantes"
        },
        precio: 30000
    },
    {
        id: "Producto-09",
        titulo: "Difusor automatico negro",
        imagen: "Img-productos/Aromatizantes/Producto-09.png",
        categoria: {
            nombre: "Aromatizantes",
            id: "aromatizantes"
        },
        precio: 60000
    },
    {
        id: "Producto-10",
        titulo: "Difusor automatico blanco",
        imagen: "Img-productos/Aromatizantes/Producto-10.png",
        categoria: {
            nombre: "Aromatizantes",
            id: "aromatizantes"
        },
        precio: 40000
    },
    
];

const contenedorProductos = document.querySelector("#contenedor-productos");
const botonesCategorias = document.querySelectorAll(".boton-categoria");
const tituloPrincipal = document.querySelector("#titulo-principal");
let botonesAñadir = document.querySelectorAll(".producto-añadir");
const numero = document.querySelector("#numero");

function cargarProductos(productosElegidos){

    contenedorProductos.innerHTML = "";

    productosElegidos.forEach(producto => {

        const div = document.createElement("div");
        div.classList.add("producto");
        div.innerHTML = `
        <img class="producto-imagen" src="${producto.imagen}" alt="${producto.titulo}">
                <div class="producto-detalles">
                    <h3 class="producto-titulo">${producto.titulo}</h3>
                    <p class="producto-precio">PYG${producto.precio}</p>
                    <button class="producto-añadir" id="${producto.id}">Añadir</button>
                </div>
        `;

        contenedorProductos.append(div);

    })

    actualizarBotonesAñadir();
}

cargarProductos(productos);

botonesCategorias.forEach(boton => {
    boton.addEventListener("click", (e) => {

        botonesCategorias.forEach(boton => boton.classList.remove("active"));
        e.currentTarget.classList.add("active");

        if(e.currentTarget.id != "todos"){

            const productoCategoria = productos.find(producto => producto.categoria.id === e.currentTarget.id);
            tituloPrincipal.innerText = productoCategoria.categoria.nombre;


        const productosBoton = productos.filter(producto => producto.categoria.id === e.currentTarget.id);

        cargarProductos(productosBoton);

        } else{

            tituloPrincipal.innerText = "Todos los productos";

            cargarProductos(productos);

        }


    })
});

function actualizarBotonesAñadir() {

    botonesAñadir = document.querySelectorAll(".producto-añadir");

    botonesAñadir.forEach(boton => {
        boton.addEventListener("click", agregarAlCarro)
    });
}
let productosEnCarro;

let productosEnCarroLS = JSON.parse(localStorage.getItem("productos-en-carro"));

if (productosEnCarroLS) {
    productosEnCarro = productosEnCarroLS;
    actualizarNumero();
   
} else {
    productosEnCarro = [];
}


function agregarAlCarro(e) {

    const idBoton = e.currentTarget.id;
    const productoAñadido = productos.find(producto => producto.id === idBoton);

    if(productosEnCarro.some(producto => producto.id === idBoton)){

        const index = productosEnCarro.findIndex(producto => producto.id === idBoton);
        productosEnCarro[index].cantidad++;
        

    }else {
        productoAñadido.cantidad = 1;
        productosEnCarro.push(productoAñadido);
    }

    actualizarNumero();

    localStorage.setItem("productos-en-carro", JSON.stringify(productosEnCarro));

}

function actualizarNumero() {
    
    let nuevoNumero = productosEnCarro.reduce((acc, producto) => acc + producto.cantidad, 0);

    numero.innerText = nuevoNumero;
}