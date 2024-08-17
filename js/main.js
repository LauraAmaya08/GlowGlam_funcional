
document.addEventListener('DOMContentLoaded', () => {
    const elementoLista = document.querySelectorAll(".lista__boton--click");

    elementoLista.forEach(element => {
        element.addEventListener("click", () => {
            element.classList.toggle('arrow')
            let height = 0;
            let menu = element.nextElementSibling
            console.log(menu.scrollHeight)
            if (menu.clientHeight == 0) {
                height = menu.scrollHeight
                menu.style.height = height + "px"
            } else {
                menu.style.height = "0px"
            }
            
        })
    });

    const abrirMenu = document.getElementById("abrir")
    const cerrarMenu = document.getElementById("cerrar")

    abrirMenu.addEventListener("click", () => {
        console.log("ok")
        let menu = document.querySelector(".navegador");
        menu.classList.toggle("visible")
    })

    cerrarMenu.addEventListener("click", () => {
        let menu = document.querySelector(".navegador");
        menu.classList.remove("visible")
    });

    const abrirPregunta = document.querySelectorAll(".faq-pregunta")
    abrirPregunta.forEach(element => {
        element.addEventListener("click",()=>{
            let itemFaq = element.parentElement;
            document.querySelectorAll('.faq-item').forEach(element => {
                if (element !== itemFaq) {
                    element.classList.remove('active');
                }
            });
    
            itemFaq.classList.toggle("active")
        })
    })

//Cargar Json y mostrar Productos

const cargarJson = async() => {
    try {
        const respuesta = await fetch("../productos.json")
        if (respuesta.ok){
            const datos = await respuesta.json();
            return productosArray = datos.productos
        }else{
            throw new Error ("Error al conectar con la base de datos")
        }
    } catch (error) {
        console.error("Error:", error.message);
    }
}

const cargarTodosLosProductos = async() =>{
    await cargarJson()
    try {
        let productos = "";
        productosArray.forEach(element => {
            let precio = element.precio
            productos += `<div class = "producto">
            <a href="../index.html" class="productoEnlace">
            <img class= "imagenProducto" src= "../${element.imagen}" >
            <div class="info">
            <h2 class= "nombreProducto"> ${element.nombre}</h2>
            <h3 class= "precioProducto"> $${precio.toFixed(2)} </h3>
            <h3 class= "marcaNombre"> ${element.marca}</h3>
            </div>
            </a>
            </div>
            `
        });
        document.getElementById("productos").innerHTML = productos;
    } catch (error) {
        console.error("Error:", error.message);
    }
}

const cargarProductosFBM = async() =>{
    await cargarJson()
    try {
        let productos = "";
        const listaFBM = [];
        productosArray.forEach(element => {
            if (element.marca === "Florence By Mills"){
                listaFBM.push(element)
            }
        });
        listaFBM.forEach(element => {
            let precio = element.precio
            productos += `<div class = "producto">
            <a href="../index.html" class="productoEnlace">
            <img class= "imagenProducto" src= "../${element.imagen}" >
            <div class="info">
            <h2 class= "nombreProducto"> ${element.nombre}</h2>
            <h3 class= "precioProducto"> $${precio.toFixed(2)} </h3>
            </div>
            </a>
            </div>
            `
        });
        document.getElementById("productosFBM").innerHTML= productos
    } catch (error) {
        console.error("Error:", error.message);
    }
}

const cargarProductosFB = async() =>{
    await cargarJson()
    try {
        let productos = "";
        const listaFB = [];
        productosArray.forEach(element => {
            if (element.marca === "Fenty Beauty"){
                listaFB.push(element)
            }
        });
        listaFB.forEach(element => {
            let precio = element.precio
            productos += `<div class = "producto">
            <a href="../index.html" class="productoEnlace">
            <img class= "imagenProducto" src= "../${element.imagen}" >
            <div class="info">
            <h2 class= "nombreProducto"> ${element.nombre}</h2>
            <h3 class= "precioProducto"> $${precio.toFixed(2)} </h3>
            </div>
            </a>
            </div>
            `
        });
        document.getElementById("productosFB").innerHTML= productos
    } catch (error) {
        console.error("Error:", error.message);
    }
}

const cargarProductosRB = async() =>{
    await cargarJson()
    try {
        let productos = "";
        const listaRB = [];
        productosArray.forEach(element => {
            if (element.marca === "Rare Beauty"){
                listaRB.push(element)
            }
        });
        listaRB.forEach(element => {
            let precio = element.precio
            productos += `<div class = "producto">
            <a href="../index.html" class="productoEnlace">
            <img class= "imagenProducto" src= "../${element.imagen}" >
            <div class="info">
            <h2 class= "nombreProducto"> ${element.nombre}</h2>
            <h3 class= "precioProducto"> $${precio.toFixed(2)} </h3>
            </div>
            </a>
            </div>
            `
        });
        document.getElementById("productosRB").innerHTML= productos
    } catch (error) {
        console.error("Error:", error.message);
    }
}

const cargarProductosRhode = async() =>{
    await cargarJson()
    try {
        let productos = "";
        const listaRhode = [];
        productosArray.forEach(element => {
            if (element.marca === "Rhode"){
                listaRhode.push(element)
            }
        });
        listaRhode.forEach(element => {
            let precio = element.precio
            productos += `<div class = "producto">
            <a href="../index.html" class="productoEnlace">
            <img class= "imagenProducto" src= "../${element.imagen}" >
            <div class="info">
            <h2 class= "nombreProducto"> ${element.nombre}</h2>
            <h3 class= "precioProducto"> $${precio.toFixed(2)} </h3>
            </div>
            </a>
            </div>
            `
        });
        document.getElementById("productosRhode").innerHTML= productos
    } catch (error) {
        console.error("Error:", error.message);
    }
}

cargarTodosLosProductos()
cargarProductosFBM()
cargarProductosFB()
cargarProductosRB()
cargarProductosRhode()
})